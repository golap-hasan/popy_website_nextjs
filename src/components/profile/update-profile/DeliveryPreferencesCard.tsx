import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DeliveryPreferencesCard = () => {
  return (
    <Card className="border-border/50">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="text-lg">Delivery preferences</CardTitle>
        <CardDescription>
          Set the address used for quick checkout and order summaries.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address-line">Street address</Label>
          <Textarea
            id="address-line"
            name="streetAddress"
            rows={3}
            placeholder="House, road, apartment or landmark"
            defaultValue="House 12, Road 3, Sector 4, Uttara"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue="Dhaka" placeholder="Enter city" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postal-code">Postal code</Label>
            <Input id="postal-code" name="postalCode" defaultValue="1230" placeholder="Enter postal code" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" defaultValue="Bangladesh" placeholder="Enter country" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery-notes">Delivery notes (optional)</Label>
            <Input
              id="delivery-notes"
              name="deliveryNotes"
              placeholder="Gate code, preferred delivery time"
            />
          </div>
        </div>
      </CardContent>
      <CardAction className="px-6">
        <Button type="submit" variant="outline" className="w-full rounded-full sm:w-auto">
          Save delivery preferences
        </Button>
      </CardAction>
    </Card>
  );
};

export default DeliveryPreferencesCard;
