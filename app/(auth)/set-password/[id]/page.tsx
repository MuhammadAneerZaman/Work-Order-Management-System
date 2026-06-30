import PasswordForm from "@/components/passworfForm";
import { getClientDetailsById } from "@/lib/client/getClientDetails";
import { getVendorDetails } from "@/lib/vendor/getVendorDetails";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
}) {
  const { id } = await params;

  const type = (await searchParams).type;

  console.log("Type :: ", type);
  let data;
  let email;

  if (type == "vendor") {
    data = await getVendorDetails(id);
    email = data?.data.data.Vendor_Email;
  }

  if (type == "client") {
    data = await getClientDetailsById(id);
    email = data?.data.data.Email;
  }

  if (!data?.success) return <div>Error loading vendor details.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <PasswordForm id={id} email={email} type={type} />
    </div>
  );
}
