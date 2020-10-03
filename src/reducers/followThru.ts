import { Action, FollowThru } from "../interfaces"

export const followThru = (links:FollowThru[] = [], action:Action<FollowThru | string>) => {
  switch (action.type) {
    case "ADD_LINK":
      return [...links, action.payload as FollowThru];
    case "REMOVE_LINK":
      return links.filter(link => link.id !== action.payload as string)
    case "CLEAR_LINKS":
      return [];
  }
  return links;
}