import { useState } from "react";
import { Info } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

import SiteInfoSheet from "./SiteInfoSheet";

const SiteInfoButton = () => {
  const [siteInfoSheetIsOpen, setSiteInfoSheetIsOpen] = useState(false);

  return (
    <>
      <Button
        icon={Info}
        size="$4"
        scaleIcon={1.2}
        animation="quick"
        onPress={() => setSiteInfoSheetIsOpen(true)}
        enterStyle={{
          scale: 0.5,
          opacity: 0
        }}
      />

      {siteInfoSheetIsOpen && (
        <SiteInfoSheet
          open={siteInfoSheetIsOpen}
          setOpen={setSiteInfoSheetIsOpen}
        />
      )}
    </>
  );
};

export default SiteInfoButton;
