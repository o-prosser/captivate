"use client";

import { Button } from "@/ui/button";

import { updateTheme } from "./actions";

const Color = () => {
  return (
    <div className="grid grid-cols-7 gap-1.5 sm:gap-3 mt-6 max-w-md">
      {/* red-7 dark:red-9 */}
      <Button
        onClick={() => updateTheme("red")}
        variant={null}
        size={null}
        className="aspect-square bg-[#e5484d] dark:bg-[#8c1d28] hover:opacity-90"
      />
      {/* pink */}
      <Button
        onClick={() => updateTheme("pink")}
        variant={null}
        size={null}
        className="aspect-square bg-[#d6409f] dark:bg-[#7c2860] hover:opacity-90"
      />
      {/* purple */}
      <Button
        onClick={() => updateTheme("purple")}
        variant={null}
        size={null}
        className="aspect-square bg-[#8e4ec6] dark:bg-[#61357e] hover:opacity-90"
      />
      {/* indigo - default */}
      <Button
        onClick={() => updateTheme("indigo")}
        variant={null}
        size={null}
        className="aspect-square bg-[#2c438f] hover:opacity-90"
      />
      {/* blue */}
      <Button
        onClick={() => updateTheme("blue")}
        variant={null}
        size={null}
        className="aspect-square bg-[#0091ff] dark:bg-[#0f5096] hover:opacity-90"
      />
      {/* teal */}
      <Button
        onClick={() => updateTheme("teal")}
        variant={null}
        size={null}
        className="aspect-square bg-[#12a594] dark:bg-[#1b5e54] hover:opacity-90"
      />
      {/* grass */}
      <Button
        onClick={() => updateTheme("grass")}
        variant={null}
        size={null}
        className="aspect-square bg-[#46a758] dark:bg-[#2d5d39] hover:opacity-90"
      />
    </div>
  );
};

export default Color;
