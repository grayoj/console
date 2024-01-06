import { HorizontalNavigationBar } from "../components/HorizontalNavigationBar";
import { PageWrapper } from "../components/PageWrapper";
import ProcessList from "../components/ProcessList";
import SystemInfoGrid from "../components/SystemGrid";
import SystemUsageGraph from "../components/SystemUsageGraph";
import { VerticalNavigation } from "../components/VerticalNavigationBar";

export const Monitor = () => {
  return (
    <>
      <div>
        <HorizontalNavigationBar name="Monitor" />
        <div className="flex">
          <VerticalNavigation />
          <div className="flex-grow">
            <PageWrapper>
              <SystemInfoGrid />
              <SystemUsageGraph />
              <ProcessList pageSize={5} />
            </PageWrapper>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
