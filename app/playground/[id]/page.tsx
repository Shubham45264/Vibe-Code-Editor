"use client";
import React from "react";
import { useParams } from "next/navigation";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer";


const MainPlaygroundPage = () => {

  const { id } = useParams<{ id: string }>();

  const { templateData, isLoading, error, playgroundData, saveTemplateData } = usePlayground(id);

  console.log("TemplateData", templateData)
  console.log("PlaygroundData", playgroundData)

  const activeFile = "Sample.txt"
  return (
    <TooltipProvider>
      <>
      <TemplateFileTree
      data={templateData!}
      onFileSelect={()=>{}}
      selectedFile={activeFile}
      title="File Explorer"
      onAddFile={()=>{}}
      onAddFolder={()=>{}}
      onDeleteFile={()=>{}}
      onDeleteFolder={()=>{}}
      onRenameFile={()=>{}}
      onRenameFolder={()=>{}}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1"/>
          <Separator orientation='vertical' className="mr-2 h-4"/>

        </header>
        <div className="flex flex-1 items-center gap-2">
          <div className="flex flex-col flex-1">
            <h1 className="text-sm font-medium">
              {playgroundData?.title || "Codee Playground"}
            </h1>
          </div>

        </div>
      </SidebarInset>
      </>
    </TooltipProvider>
  );
};

export default MainPlaygroundPage;