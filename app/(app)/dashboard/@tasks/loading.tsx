const Loading = () => {
  return (
    <div className="bg-muted/20 rounded-2xl py-3 px-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-4 my-1.5 w-40 bg-muted" />
          <div className="h-3.5 my-[3px] w-32 bg-muted" />
        </div>
        <div className="h-3 w-28 bg-muted" />
      </div>
    </div>
  );
};

export default Loading;
