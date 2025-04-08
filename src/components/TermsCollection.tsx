import { TabItem, Tabs } from "flowbite-react";
import Terms from "./Terms";
import Policy from "./Policy";
import Eula from "./Eula";

const TermsCollection = () => {
  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[50px] py-[54px] px-[20px]">
        <Tabs
          aria-label="Default tabs"
          variant="default"
          className="flex justify-center"
        >
          <TabItem active title="Terms & Conditions">
            <Terms />
          </TabItem>
          <TabItem title="Privacy Policy">
            <Policy />
          </TabItem>
          <TabItem title="EULA">
            <Eula />
          </TabItem>
        </Tabs>
      </div>
    </>
  );
};

export default TermsCollection;
