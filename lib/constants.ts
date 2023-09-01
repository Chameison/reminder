export enum CollectionColors {
  sunset = "bg-gradient-to-r from-red-500 to-orange-500",
  poppy = "bg-gradient-to-r from-rose-400 to-red-500",
  rosebud = "bg-gradient-to-r from-violet-500 to-purple-500",
  snowflake = "bg-gradient-to-r from-indigo-400 to-cyan-400",
  candy = "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500",
  firtree = "bg-gradient-to-r from-emerald-500 to-emerald-900",
  metal = "bg-gradient-to-r from-slate-500 to-slate-800",
  powder = "bg-gradient-to-r from-violet-200 to-pink-200",
  
  ocean = "bg-gradient-to-r from-blue-400 to-teal-500",
  lavender = "bg-gradient-to-r from-purple-300 to-lavender-400",
  citrus = "bg-gradient-to-r from-yellow-300 to-orange-400",
  midnight = "bg-gradient-to-r from-indigo-800 to-blue-900",
  meadow = "bg-gradient-to-r from-green-300 to-lime-500",
  cherry = "bg-gradient-to-r from-red-400 to-pink-500",
  sandyBeach = "bg-gradient-to-r from-amber-300 to-sand-400",
  wine = "bg-gradient-to-r from-maroon-500 to-red-600",
  misty = "bg-gradient-to-r from-cyan-200 to-blue-200",
}

export type CollectionColor = keyof typeof CollectionColors;
