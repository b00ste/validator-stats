import { useEffect, useState } from "react";

export const PrivacyPolicy = ({
  mountPrivacyPage,
}: {
  mountPrivacyPage: boolean;
}) => {
  const [opacity, setOpacity] = useState("opacity-0");
  // Run on mount
  useEffect(() => {
    setOpacity("opacity-100");
  }, []);
  // Run on un-mount
  useEffect(() => {
    if (!mountPrivacyPage) {
      setOpacity("opacity-0");
    }
  }, [mountPrivacyPage]);

  return (
    <div
      className={`bg-pastel-light-pink p-4 m-8 rounded-lg shadow ${opacity}`}
    >
      <h2 className="text-pastel-blue text-2xl mb-4 font-bold">
        Privacy Policy
      </h2>
      <p className="text-gray-700">
        B00ste is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, and safeguard your personal information
        when you use [Validator Monitoring Service]
        (https://validator-stats.vercel.app).
      </p>
      <h3 className="text-pastel-blue text-xl m-2">
        1. Information We Do Not Collect
      </h3>
      <p className="text-gray-700 pb-2">
        <span className="font-bold">No Cookies: </span>We do not use cookies or
        any tracking technologies that collect information about your online
        activities.
      </p>
      <p className="text-gray-700">
        <span className="font-bold">No User Data: </span>We do not collect or
        store any personal information, including but not limited to names,
        email addresses, or other identifiers, unless explicitly provided by you
        for a specific purpose (e.g., submitting feedback or contacting us).
      </p>
      <h3 className="text-pastel-blue text-xl m-2">
        2. Data Storage and Security
      </h3>
      <p className="text-gray-700 pb-2">
        <span className="font-bold">Local Storage: </span>Any information you
        provide or data generated during your use of the Website is stored
        locally on your device and is not transmitted to our servers or any
        third parties.
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Security: </span>We take reasonable
        precautions to protect the data stored locally on your device. However,
        please be aware that no method of transmission or electronic storage is
        completely secure, and we cannot guarantee the security of your data.
      </p>
      <h3 className="text-pastel-blue text-xl m-2">
        3. Links to Third-Party Websites
      </h3>
      <p className="text-gray-700">
        The Website may contain links to third-party websites or services that
        are not operated or controlled by us. This Privacy Policy does not apply
        to third-party websites. We encourage you to review the privacy policies
        of any third-party websites you visit.
      </p>
      <h3 className="text-pastel-blue text-xl m-2">
        4. Changes to This Privacy Policy
      </h3>
      <p className="text-gray-700">
        We reserve the right to update or modify this Privacy Policy at any
        time. Any changes will be effective immediately upon posting the updated
        Privacy Policy on the Website. Your continued use of the Website after
        any changes to the Privacy Policy constitutes acceptance of those
        changes.
      </p>
      <h3 className="text-pastel-blue text-xl m-2">5. Contact Us</h3>
      <p className="text-gray-700">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at b00ste.lyx@gmail.com.
      </p>
    </div>
  );
};
