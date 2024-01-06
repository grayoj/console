import DiskUsageGraph from "../components/DiskUsageGraph";
import FileSystemViewer from "../components/FileSystemViewer";
import { HorizontalNavigationBar } from "../components/HorizontalNavigationBar";
import { PageWrapper } from "../components/PageWrapper";
import { VerticalNavigation } from "../components/VerticalNavigationBar";

export const Storage = () => {
  return (
    <>
      <div>
        <HorizontalNavigationBar name="Monitor" />
        <div className="flex">
          <VerticalNavigation />
          <div className="flex-grow">
            <PageWrapper>
              <DiskUsageGraph />
              <FileSystemViewer />
            </PageWrapper>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
