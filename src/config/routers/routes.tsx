import { RouteObject, useRoutes } from "react-router-dom";
import Home from "../../pages/Home";
import MovieDetails from "../../pages/MovieDetails";

import ScrollToTop from "../../components/ScrollToTop";
import { SharedLayout } from "../../components/layout/SharedLayout";
import Favorites from "../../pages/Favourites";
import SearchPage from "../../pages/Search";

export function AppRoutes() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <SharedLayout />
        </>
      ),
      children: [
        { 
          index: true, 
          element: <Home />
           },
        { 
          path: "movie/:movieId", 
          element: <MovieDetails /> 
          },
         
          { 
          path: "favorites", 
          element: <Favorites /> 
          },
          { 
          path: "search", 
          element: <SearchPage /> 
          },
      ],
    },
  ];
  return useRoutes(routes);
}
