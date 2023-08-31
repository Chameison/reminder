import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      // appearance={{
      //   elements: {
      //     card: {
      //       backgroundColor: "#111",
      //       color: "#f1f1f1"
      //     },
      //     headerTitle: {
      //       color: "#f1f1f1"
      //     },
      //     formButtonPrimary:
      //       "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
      //   },
      // }}
    />
  );
}
