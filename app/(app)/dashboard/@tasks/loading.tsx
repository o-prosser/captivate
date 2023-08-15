const Loading = () => {
  return (
    <div className="bg-muted/20 rounded-2xl py-3 px-4 animate-pulse">
      <div className="h-4 my-1.5 w-28 bg-muted" />
      <div className="h-3.5 my-[3px] w-32 bg-muted" />

      <div className="flex items-end justify-between mt-2">
        <div className="h-3 w-28 bg-muted" />
      </div>
    </div>
  );
};

export default Loading;
