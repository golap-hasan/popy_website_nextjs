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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PersonalInfoCard = () => {
  return (
    <Card className="border-border/50">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="text-lg">Personal information</CardTitle>
        <CardDescription>
          Update how your details appear across orders, invoices, and communications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" name="firstName" defaultValue="Jane" placeholder="Enter first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" name="lastName" defaultValue="Doe" placeholder="Enter last name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              name="displayName"
              defaultValue="Jane D."
              placeholder="Name shown on profile"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Primary email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              defaultValue="jane@example.com"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Short bio (optional)</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={4}
            placeholder="Share a quick note about yourself to personalise your experience."
            defaultValue="SSC English mentor helping students fall in love with language and story-driven learning."
          />
        </div>
      </CardContent>
      <CardAction className="px-6">
        <Button type="submit" variant="outline" className="w-full rounded-full sm:w-auto">
          Save personal info
        </Button>
      </CardAction>
    </Card>
  );
};

export default PersonalInfoCard;
