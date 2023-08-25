export const metadata = {
  title: "Files",
};

const FilesLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div>
      <div>{children}</div>
      {modal}
    </div>
  );
};

export default FilesLayout;
export const runtime = "edge";
export const preferredRegion = "lhr1";
