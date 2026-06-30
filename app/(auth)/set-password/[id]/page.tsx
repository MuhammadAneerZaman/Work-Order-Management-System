import PasswordForm from "@/components/vendor/passworfForm";
import { getVendorDetails } from "@/lib/vendor/getVendorDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getVendorDetails(id);

  if (!data.success) return <div>Error loading vendor details.</div>;

  console.log(data.data.data.Vendor_Email);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <PasswordForm vendorId={id} email={data.data.data.Vendor_Email} />
    </div>
  );
}
