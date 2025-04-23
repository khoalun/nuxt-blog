export const getToastOpts = ({
  title,
  description
}: { title?: string, description: string }) => {
  return {
    id: description,
    title: title || "Success",
    description: description,
    timeout: 3000,
    ui: {
      progress: {
        base: "opacity-0",
      },
    },
  }
}