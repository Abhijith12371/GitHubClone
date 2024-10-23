import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("recent"); // Default sort type

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      // Fetch user profile
      const userProfileData = await fetch("https://api.github.com/users/Abhijith12371");
      if (!userProfileData.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const userPro = await userProfileData.json();

      // Fetch repositories
      const repoRes = await fetch(userPro.repos_url);
      if (!repoRes.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const repo = await repoRes.json();

      // Set the state
      setUserProfile(userPro);
      setRepos(repo);
    } catch (e) {
      console.error(e); // Log the error
      setError(e.message); // Set the error message
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  async function getUserProfileAndRepos(e, username = "Abhijith12371") {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null); // Reset error state
      const userProfileData = await fetch(`http://localhost:5000/api/users/profile/${username}`);
      if (!userProfileData.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const {userPro,repo} = await userProfileData.json();


      // Set the state
      setUserProfile(userPro);
      setRepos(repo);
    } catch (e) {
      console.error(e); // Log the error
      setError(e.message); // Set the error message
    } finally {
      setLoading(false);
    }
  }

  const onSort = (type) => {
    setSortType(type); // Update the sort type
    let sortedRepos = [...repos]; // Create a shallow copy of repos

    if (type === "recent") {
      sortedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (type === "stars") {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (type === "forks") {
      sortedRepos.sort((a, b) => b.forks - a.forks);
    }

    setRepos(sortedRepos); // Update state with sorted repositories
  };

  return (
    <div>
      <Search OnSearch={getUserProfileAndRepos} />
      <SortRepos onSort={onSort} sortType={sortType} />
      <div className="flex gap-5 justify-center">
        <ProfileInfo userProfile={userProfile} />
        <Repos repos={repos} />
      </div>
    </div>
  );
};

export default HomePage;
