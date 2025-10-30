import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PasswordUpdateCard = () => {
  return (
    <Card className="border-border/50">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="text-lg">Update password</CardTitle>
        <CardDescription>
          Choose a strong password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current password</Label>
            <Input id="current-password" name="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <Input id="new-password" name="newPassword" type="password" placeholder="Create a strong password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat new password"
            />
          </div>
        </div>
      </CardContent>
      <CardAction className="px-6">
        <Button type="submit" className="w-full rounded-full sm:w-auto">
          Update password
        </Button>
      </CardAction>
    </Card>
  );
};

export default PasswordUpdateCard;
