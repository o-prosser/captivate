import { Text } from "@/ui";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-[7.5rem] pt-[5.5rem] px-6 md:py-6 md:pr-8 min-h-screen md:pl-[5.5rem]">
      {children}

      {/* <Text className="mt-10 text-muted-foreground">
        &copy; Prosser Media {new Date().getFullYear()}
      </Text> */}
    </div>
  );
};

export default Body;
