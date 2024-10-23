import { useState } from "react";
import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { PROGRAMMING_LANGUAGES } from "../utils/constants";
import toast from "react-hot-toast";

// Date formatting function
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};

const Repo = ({ repo }) => {
    async function HandleCopy() {
        try {
            await navigator.clipboard.writeText(repo.clone_url);
            toast.success("Link copied to the clipboard");
        } catch {
            toast.error("Failed to copy");
        }
    }

    return (
        <li className="mb-10 relative">
            <div className="flex items-start gap-4">
                {/* Icon and title in one flex container to avoid overlap */}
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white">
                    <FaCodeBranch className="w-5 h-5 text-blue-800" />
                </span>
                <div className="w-full">
                    <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-lg sm:text-xl font-semibold break-words" // Ensure long text wraps
                        >
                            {repo.name}
                        </a>
                        <div className="flex gap-2 items-center">
                            <span className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <FaRegStar /> {repo.stargazers_count}
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <FaCodeFork /> {repo.forks}
                            </span>
                            <span
                                onClick={HandleCopy}
                                className="cursor-pointer bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"
                            >
                                <FaCopy /> Clone
                            </span>
                        </div>
                    </div>

                    <time className="block my-1 text-xs sm:text-sm font-normal leading-none text-gray-400">
                        Released on {formatDate(repo.created_at)}
                    </time>
                    <p className="mb-4 text-sm sm:text-base font-normal text-gray-500">
                        {repo.description ? repo.description : "There is no description"}
                    </p>
                    {PROGRAMMING_LANGUAGES[repo.language] && (
                        <img
                            src={PROGRAMMING_LANGUAGES[repo.language]}
                            alt="Programming language icon"
                            className="h-6 sm:h-8"
                        />
                    )}
                </div>
            </div>
        </li>
    );
};

export default Repo;
