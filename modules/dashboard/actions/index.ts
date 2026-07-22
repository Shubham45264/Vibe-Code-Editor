"use server";

import { currentUser } from "@/modules/auth/actions"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";


export const toggleStarMarked = async (playgroundId: string, isChecked: boolean) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User Id is Required")
  }
  try {
    if (isChecked) {
      await db.starMark.create({
        data: {
          playgroundId,
          userId: userId!,
          isMarked: isChecked,
        },
      });
    } else {
      await db.starMark.delete({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId: playgroundId
        },
      },
        });
    }
    revalidatePath("/dashboard");
    return {success: true, isMarked: isChecked};
  } catch (error) {
console.error("Error Updating Problem:",error);
return {success: false, error:"Failed to update problem"};

  }
};
  export const getAllPlaygroundForUser = async () => {
    const user = await currentUser();

    try {
      const playground = await (db as any).playground.findMany({
        where: {
          userId: user?.id
        },
        include: {
          user: true,
          starMarks:{
            where:{
              userId: user?.id!  
            },
            select:{
              isMarked: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return playground
    } catch (error) {
      console.log(error);
    }
  }

  export const createPlayground = async (data: {
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  }) => {
    const user = await currentUser();

    const { template, title, description } = data;

    try {
      const playground = await db.playground.create({
        data: {
          title: title,
          description: description,
          template: template,
          userId: user?.id!
        }
      })

      revalidatePath("/dashboard");
      return playground;
    } catch (error) {
      console.log(error);
    }
  }

  export const deleteProjectById = async (id: string) => {
    try {
      await db.playground.delete({
        where: {
          id
        }
      })
      revalidatePath("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  export const editProjectById = async (id: string, data: {
    title: string,
    description: string
  }) => {
    try {
      await db.playground.update({
        where: {
          id
        },
        data: data
      })
      revalidatePath("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  export const duplicateProjectById = async (id: string) => {
    try {
      const originalPlayground = await db.playground.findUnique({
        where: { id },
        // todo: add template files

      })
      if (!originalPlayground) {
        throw new Error(" Original Playground not found");
      }

      const duplicatedPlayground = await db.playground.create({
        data: {
          title: `${originalPlayground.title} (Copy)`,
          description: originalPlayground.description,
          template: originalPlayground.template,
          userId: originalPlayground.userId

          // todo: add template files

        }
      })
      revalidatePath("/dashboard");
      return duplicatedPlayground;
    } catch (error) {
      console.log(error);
    }
  }

  export const createPlaygroundFromGithub = async (data: {
    repoUrl: string;
    title?: string;
    template?: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  }) => {
    const user = await currentUser();
    if (!user?.id) {
      throw new Error("User must be logged in to import GitHub repositories");
    }

    const { repoUrl, title, template: overrideTemplate } = data;

    const cleanInput = repoUrl.trim().replace(/\.git$/, "").replace(/\/$/, "");
    let owner = "";
    let repo = "";

    if (cleanInput.includes("github.com/")) {
      const parts = cleanInput.split("github.com/")[1].split("/");
      owner = parts[0];
      repo = parts[1];
    } else if (cleanInput.includes("/")) {
      const parts = cleanInput.split("/");
      owner = parts[0];
      repo = parts[1];
    } else {
      throw new Error("Invalid GitHub repository format. Use owner/repo or full GitHub URL.");
    }

    if (!owner || !repo) {
      throw new Error("Could not determine owner and repository name.");
    }

    // Fetch repository details to get default branch
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { "User-Agent": "VibeCode-Editor" },
      cache: "no-store",
    });

    if (!repoRes.ok) {
      if (repoRes.status === 404) {
        throw new Error(`Repository "${owner}/${repo}" not found or is private.`);
      }
      throw new Error(`GitHub API error (${repoRes.status}): Failed to access repository.`);
    }

    const repoData = await repoRes.json();
    const defaultBranch = repoData.default_branch || "main";

    // Fetch recursive file tree
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      {
        headers: { "User-Agent": "VibeCode-Editor" },
        cache: "no-store",
      }
    );

    if (!treeRes.ok) {
      throw new Error(`Failed to fetch file tree for ${owner}/${repo}`);
    }

    const treeData = await treeRes.json();
    const treeItems: Array<{ path: string; type: string; size?: number }> = treeData.tree || [];

    // Filter text files, excluding node_modules, binaries, large files
    const filteredBlobs = treeItems
      .filter((item) => item.type === "blob")
      .filter((item) => {
        const p = item.path.toLowerCase();
        return (
          !p.includes("node_modules/") &&
          !p.startsWith(".git/") &&
          !p.endsWith(".png") &&
          !p.endsWith(".jpg") &&
          !p.endsWith(".jpeg") &&
          !p.endsWith(".gif") &&
          !p.endsWith(".ico") &&
          !p.endsWith(".svg") &&
          !p.endsWith(".woff") &&
          !p.endsWith(".woff2") &&
          !p.endsWith(".ttf") &&
          !p.endsWith(".zip") &&
          !p.endsWith(".exe") &&
          !p.endsWith(".lock") &&
          (item.size || 0) < 300000
        );
      })
      .slice(0, 70);

    // Fetch content of selected files in parallel
    const fileContentsMap = new Map<string, string>();
    await Promise.all(
      filteredBlobs.map(async (blob) => {
        try {
          const rawRes = await fetch(
            `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${blob.path}`,
            {
              headers: { "User-Agent": "VibeCode-Editor" },
              cache: "no-store",
            }
          );
          if (rawRes.ok) {
            const text = await rawRes.text();
            fileContentsMap.set(blob.path, text);
          }
        } catch (e) {
          console.error(`Failed to fetch ${blob.path}:`, e);
        }
      })
    );

    // Build TemplateFolder tree structure
    const rootItems: any[] = [];

    const insertFileIntoTree = (filePath: string, content: string) => {
      const parts = filePath.split("/");
      let currentLevel = rootItems;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isFile = i === parts.length - 1;

        if (isFile) {
          const lastDot = part.lastIndexOf(".");
          let filename = part;
          let fileExtension = "";
          if (lastDot > 0) {
            filename = part.substring(0, lastDot);
            fileExtension = part.substring(lastDot + 1);
          }
          currentLevel.push({
            id: `file_${filePath.replace(/[^a-zA-Z0-9]/g, "_")}_${Math.random().toString(36).slice(2, 6)}`,
            filename,
            fileExtension,
            content,
          });
        } else {
          let folder = currentLevel.find((item: any) => item.folderName === part);
          if (!folder) {
            folder = {
              id: `folder_${part.replace(/[^a-zA-Z0-9]/g, "_")}_${Math.random().toString(36).slice(2, 6)}`,
              folderName: part,
              items: [],
            };
            currentLevel.push(folder);
          }
          currentLevel = folder.items;
        }
      }
    };

    for (const [filePath, content] of fileContentsMap.entries()) {
      insertFileIntoTree(filePath, content);
    }

    // Detect template type from package.json if present
    let templateType: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR" =
      overrideTemplate || "REACT";
    const pkgContent = fileContentsMap.get("package.json");
    if (pkgContent && !overrideTemplate) {
      try {
        const pkg = JSON.parse(pkgContent);
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
        if (allDeps.next) templateType = "NEXTJS";
        else if (allDeps.vue) templateType = "VUE";
        else if (allDeps.express) templateType = "EXPRESS";
        else if (allDeps.hono) templateType = "HONO";
        else if (allDeps["@angular/core"]) templateType = "ANGULAR";
        else templateType = "REACT";
      } catch (e) {}
    }

    const templateFolderData = {
      folderName: "Root",
      items: rootItems,
    };

    const projectTitle = title?.trim() || repoData.name || `${owner}/${repo}`;

    const playground = await db.playground.create({
      data: {
        title: projectTitle,
        description: `Imported from GitHub (${owner}/${repo})`,
        template: templateType,
        userId: user.id,
        templateFiles: {
          create: {
            content: JSON.stringify(templateFolderData),
          },
        },
      },
    });

    revalidatePath("/dashboard");
    return playground;
  };

