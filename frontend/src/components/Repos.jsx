import Repo from "./Repo";

const Repos = ({ repos }) => {
    return (
        <div className={`lg:w-2/3 w-full bg-glass rounded-lg px-4 md:px-8 py-6`}>
            <ol className='relative border-s border-gray-200'>
                {repos.map(repo => (
                    <Repo key={repo.id} repo={repo} /> // Assuming repo has a unique id
                ))}
            </ol>
        </div>
    );
};

export default Repos;