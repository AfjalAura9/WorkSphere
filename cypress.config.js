import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://worksphere-peach.vercel.app/", // Replace with your actual deployed URL
    projectId: "4hocvh",
  },
});
