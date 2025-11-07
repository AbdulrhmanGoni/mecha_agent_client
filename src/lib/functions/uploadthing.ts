import { createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "2MB",
            maxFileCount: 1,
            acl: "public-read"
        },
    })
        .middleware(async ({ req }) => {
            const userEmail = req.headers.get("userEmail")
            if (!userEmail) {
                throw new Error("Unauthorized");
            }

            return { userEmail };
        })
        .onUploadComplete(() => { }),
} satisfies FileRouter;

import { generateSvelteHelpers } from "@uploadthing/svelte";

export const { createUploader, createUploadThing } =
    generateSvelteHelpers<OurFileRouter>();


export type OurFileRouter = typeof ourFileRouter;
