import { Button } from "@/components/ui/button";

export function SignOut() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
