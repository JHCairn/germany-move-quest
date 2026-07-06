import {
  Route,
  ListTodo,
  House,
  UserRound,
  BriefcaseBusiness,
  Sofa,
  Heart,
} from "lucide-react";

export const icons = {
  // Navigation
  journey: Route,
  quests: ListTodo,
  home: House,
  profile: UserRound,

  // Journey stages
  stages: {
    preparing: BriefcaseBusiness,
    "just-arrived": House,
    "settling-in": Sofa,
    "living": Heart,
  },
};