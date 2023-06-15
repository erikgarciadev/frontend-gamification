import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { handleLogout } from "../redux/authSlice";
import InstructorPage from "../pages/instructor";
import { BASE_PATHS } from "../utils/constants";
import InstructorProgram from "../pages/instructor/program";
import HomeStudent from "../pages/student/home";
import ProfileStudent from "../pages/student/profile";
import BadgesStudent from "../pages/student/badges";
import InstructorChapter from "../pages/instructor/chapter";
import UnitsPage from "../pages/student/units";
import ChaptersPage from "../pages/student/chapters";
import ChapterPage from "../pages/student/chapter";

export default function PrivateRoutes() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   let handler = setTimeout(() => {
  //     // dispatch(handleLogout());
  //   }, 10000);

  //   return () => clearTimeout(handler);
  // }, []);

  const user = useAppSelector((state) => state.auth.user);

  const getBasePath = () => {
    if (!user?.role?.value) return "/";
    return BASE_PATHS[user?.role?.value as "instructor" | "student"] ?? "/";
  };

  return (
    <Routes>
      <Route
        path="/instructor/program/:unit_id/chapter/:chapter_id"
        element={<InstructorChapter />}
      />
      <Route
        path="/instructor/program/:unit_id/chapter"
        element={<InstructorChapter />}
      />
      <Route path="/instructor/program" element={<InstructorProgram />} />
      <Route path="/instructor" element={<InstructorPage />} />
      <Route path="/student/chapter/:chapter_id" element={<ChapterPage />} />
      <Route path="/student/program/:unit_id" element={<ChaptersPage />} />
      <Route path="/student/program" element={<UnitsPage />} />
      <Route path="/student/profile" element={<ProfileStudent />} />
      <Route path="/student/badges" element={<BadgesStudent />} />
      <Route path="/student" element={<HomeStudent />} />
      <Route path="*" element={<Navigate to={getBasePath()} replace />} />
    </Routes>
  );
}
