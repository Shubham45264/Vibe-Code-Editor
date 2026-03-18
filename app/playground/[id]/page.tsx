"use client";
import React from "react";
import { useParams } from "next/navigation";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";

const MainPlaygroundPage = () => {

  const { id } = useParams<{ id: string }>();

  const { templateData, isLoading, error, playgroundData, saveTemplateData } = usePlayground(id);

  console.log("TemplateData", templateData)
  console.log("PlaygroundData", playgroundData)
  return (
    <div>
      Params : {id}
    </div>
  );
};

export default MainPlaygroundPage;