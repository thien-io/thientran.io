import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "@/components/image-grid";

export const metadata: Metadata = {
  title: "Photos",
  description: "My Photos",
};
import Photos from "@/components/photos";
export default function PhotosPage() {
  return (
    <Photos/>
  );
}
