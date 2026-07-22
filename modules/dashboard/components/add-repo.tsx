"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowDown, GitBranch, Github, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createPlaygroundFromGithub } from "../actions";

const AddRepo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState<
    "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR"
  >("REACT");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Helper to extract repo name from URL or raw input string
  const handleUrlChange = (val: string) => {
    setRepoUrl(val);
    if (!title || title.trim() === "" || title.startsWith("GitHub Repo:")) {
      try {
        const clean = val.replace(/\.git$/, "").replace(/\/$/, "");
        const parts = clean.split("/");
        const repoName = parts[parts.length - 1] || parts[parts.length - 2];
        if (repoName && repoName !== "github.com") {
          setTitle(repoName);
        }
      } catch (e) {}
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoUrl.trim()) {
      toast.error("Please enter a valid GitHub repository URL or name");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Fetching GitHub repository files...", { id: "github-import" });

      const newPlayground = await createPlaygroundFromGithub({
        repoUrl: repoUrl.trim(),
        title: title.trim() || undefined,
        template,
      });

      if (!newPlayground) {
        throw new Error("Failed to create playground from GitHub repository");
      }

      toast.success(`Repository ${newPlayground.title} opened in VibeCode Editor!`, { id: "github-import" });
      setIsOpen(false);
      router.push(`/playground/${newPlayground.id}`);
    } catch (error: any) {
      console.error("Error opening GitHub repository:", error);
      toast.error(error?.message || "Failed to open GitHub repository. Please check the URL and try again.", { id: "github-import" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
        transition-all duration-300 ease-in-out
        hover:bg-background hover:border-[#E93F3F] hover:scale-[1.02]
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
        hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
            size={"icon"}
          >
            <ArrowDown size={30} className="transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#e93f3f]">Open Github Repository</h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">Work with your repositories in our editor</p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={"/github.svg"}
            alt="Open GitHub repository"
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#e93f3f] flex items-center gap-2">
              <Github className="h-6 w-6 text-[#e93f3f]" />
              Open GitHub Repository
            </DialogTitle>
            <DialogDescription>
              Enter a public GitHub repository link or identifier to open it in VibeCode Editor.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="repo-url" className="text-sm font-medium">
                GitHub Repository URL or Name
              </Label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="repo-url"
                  placeholder="e.g. facebook/react or https://github.com/vercel/next.js"
                  value={repoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-title" className="text-sm font-medium">
                Playground Title
              </Label>
              <Input
                id="project-title"
                placeholder="my-github-project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-select" className="text-sm font-medium">
                Framework Runtime Template
              </Label>
              <Select
                value={template}
                onValueChange={(val: any) => setTemplate(val)}
              >
                <SelectTrigger id="template-select" className="w-full">
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REACT">React (Vite + TS)</SelectItem>
                  <SelectItem value="NEXTJS">Next.js</SelectItem>
                  <SelectItem value="VUE">Vue.js</SelectItem>
                  <SelectItem value="EXPRESS">Express.js</SelectItem>
                  <SelectItem value="HONO">Hono.js</SelectItem>
                  <SelectItem value="ANGULAR">Angular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#E93F3F] hover:bg-[#d03636] text-white"
                disabled={isLoading || !repoUrl.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening Repo...
                  </>
                ) : (
                  "Open in Editor"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddRepo;
