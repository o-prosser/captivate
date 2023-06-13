import { Text } from "@/ui";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-y-scroll p-6 md:px-8">
      {children}

      <Text className="mt-10 text-muted-foreground">
        &copy; Prosser Media {new Date().getFullYear()}
      </Text>
    </div>
  );
};

export default Body;
