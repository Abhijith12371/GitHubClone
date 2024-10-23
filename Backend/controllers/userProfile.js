import dotenv from "dotenv"

dotenv.config()

const userProfileAndRepo = async (req,res) => {
    try {
        const {username}=req.params
      const userProfileData = await fetch(`https://api.github.com/users/${username}`,{
        "headers":{
            "Authorization":`token ${process.env.GITHUB_KEY}`
        }
      });
      if (!userProfileData.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const userPro = await userProfileData.json();

      // Fetch repositories
      const repoRes = await fetch(userPro.repos_url,{
        "headers":{
            "Authorization":`token ${process.env.GITHUB_KEY}`
        }
      });
      if (!repoRes.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const repo = await repoRes.json();
      res.status(200).json({userPro,repo})
    } catch (e) {
      console.error(e); 

    } finally {

    }
  };


  export default userProfileAndRepo