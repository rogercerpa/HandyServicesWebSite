"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input } from "@/components/ui";
import { mockCustomer } from "@/lib/data/portal-mock";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Save,
  Bell,
  Shield,
  Trash2
} from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: mockCustomer.name,
    email: mockCustomer.email,
    phone: mockCustomer.phone,
    address: mockCustomer.address,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-charcoal-400">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        {/* Main Settings */}
        <div className="space-y-6">
          {/* Profile Info */}
          <Card>
            <CardContent>
              <h2 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-electric" />
                Personal Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-electric/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-electric">
                        {formData.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-charcoal-700 rounded-full flex items-center justify-center text-charcoal-300 hover:bg-electric hover:text-charcoal transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{formData.name}</p>
                    <p className="text-sm text-charcoal-400">
                      Customer since {mockCustomer.createdAt}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    leftIcon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    leftIcon={<Mail className="w-5 h-5" />}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    leftIcon={<Phone className="w-5 h-5" />}
                  />
                </div>

                <Input
                  label="Service Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  leftIcon={<MapPin className="w-5 h-5" />}
                />

                <div className="flex items-center gap-4 pt-4">
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    leftIcon={!isSaving ? <Save className="w-5 h-5" /> : undefined}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  {saved && (
                    <span className="text-green-500 text-sm">
                      Changes saved successfully!
                    </span>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardContent>
              <h2 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-electric" />
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  { id: "email_appointments", label: "Appointment reminders", description: "Receive email reminders before scheduled services", default: true },
                  { id: "email_updates", label: "Service updates", description: "Get updates when technician is on the way", default: true },
                  { id: "email_promotions", label: "Promotions & offers", description: "Receive special offers and discounts", default: false },
                  { id: "sms_reminders", label: "SMS notifications", description: "Receive text message reminders", default: true },
                ].map((pref) => (
                  <label
                    key={pref.id}
                    className="flex items-start gap-4 p-4 bg-charcoal-800 rounded-xl cursor-pointer hover:bg-charcoal-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={pref.default}
                      className="mt-1 w-5 h-5 rounded border-charcoal-600 bg-charcoal-900 text-electric focus:ring-electric"
                    />
                    <div>
                      <span className="font-medium text-white block">{pref.label}</span>
                      <span className="text-sm text-charcoal-400">{pref.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardContent>
              <h2 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-electric" />
                Security
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-charcoal-800 rounded-xl">
                  <div>
                    <span className="font-medium text-white block">Password</span>
                    <span className="text-sm text-charcoal-400">Last changed 3 months ago</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-charcoal-800 rounded-xl">
                  <div>
                    <span className="font-medium text-white block">Two-Factor Authentication</span>
                    <span className="text-sm text-charcoal-400">Add extra security to your account</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Enable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-white mb-4">Account Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Customer ID</span>
                  <span className="text-white font-mono">{mockCustomer.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Member Since</span>
                  <span className="text-white">{mockCustomer.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-900/50">
            <CardContent>
              <h3 className="font-semibold text-red-400 mb-4">Danger Zone</h3>
              <p className="text-sm text-charcoal-400 mb-4">
                Permanently delete your account and all associated data.
              </p>
              <Button
                variant="danger"
                size="sm"
                className="w-full"
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

