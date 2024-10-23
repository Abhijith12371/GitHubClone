const exploreRepos=async (req,res)=>{
    const {language}=req.params
    const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
            "headers":{
                "Authorization":`token ${process.env.GITHUB_KEY}`
            }
        }
      );
      const data = await response.json();
      res.send(data)
}

export default exploreRepos