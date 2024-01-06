import Footer from "../components/Footer";
import { HorizontalNavigationBar } from "../components/HorizontalNavigationBar";
import NetworkInfo from "../components/NetworkInfo";
import { PageWrapper } from "../components/PageWrapper";
import { VerticalNavigation } from "../components/VerticalNavigationBar";

export const Network = () => {
  return (
    <>
      <div>
        <HorizontalNavigationBar name="Monitor" />
        <div className="flex">
          <VerticalNavigation />
          <div className="flex-grow">
            <PageWrapper>
              <NetworkInfo />
              <Footer status="healthy" />
            </PageWrapper>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
