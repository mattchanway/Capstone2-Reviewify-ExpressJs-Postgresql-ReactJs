# Reviewify - Capstone 2 Project

This is Reviewify, my capstone 2 for Springboard Software Engineering Career Track. The site is deployed at http://5.161.134.120:3000/, and a video demonstration of the site's functionality can be viewed at https://youtu.be/DLvOI3dL-fs. Note, since the site requires authentication via the Spotify Web API, you must have a Spotify account to login to Reviewify.

# Overview

Reviewify is a full-stack, database-driven website powered by the Spotify API. It incorporates OAuth 2.0 allowing users to login with their Spotify account, find music that they would like to review, and post reviews on that music. Users can read existing reviews, add comments to written reviews, and also give other users a 'thumbs-up' or 'thumbs-down' as to how they rate that user as a reviewer. There are many options available as to how users find the reviews they would like to read - the front page carousel shows reviews with high engagement (comments), new reviews, highlights a user who is rated highly, and also randomly selects artists for the user to read reviews of.

# Technologies Used

Express and Node JS were used to create the back end application that queries the Spotify Web API and interacts with the Reviewify database. React was used as the front end library, populating the pages' states' from the response given from the back end. CSS was used to ensure the site would be responsive for devices of different screen sizes.
