Build the frontend for an image analysis app called "Shoot Right". I will be a nextjs frontend. 

Only focus on building the frontend, the backend will be taken care by a unified backend server that shall act as backend for all apps built by me. Whatever data is required from the backend, please list it all inside a backend-requirement.md file. Ensure all LLM calls, DB calls, auth 

Requirements: 
- Authentication and login and other required pages
- Landing page and upload image button (auth not mandatory)
- analysis dashboard (auth required)
- user dashboard (auth required)

Authentication and login: Add the best authentication, I shall use this authentication service for all my other applications too. I want to use google sso along with email-password login too. We can consider to add a forgot password path and a verify email path too, but that can be for later. For now, lets build all the required UI, the rest will be made with backend. 

Landing page and upload image button: The landing page will have a brief about the app and shall give instructions on how to login. It will also have a button to upload, but the results will be only displayed after authentiation (login)

Analysis dashboard: This will display the entire analysis with the entire image, there will be a toggle button that shows the rule of third grid or the golden ratio grid and the spiral. There will be a overall summary analysis that will be displayed below the image. Below this there will be a series of cards that shall show more details when clicked on with a 'x' button to close it. The different card will have the following data: 
- the metadata will be displayed along with the histogram. (extracted by frontend)
- composition analysis (provided by LLM)
- technical analysis (provided by LLM)
- color and aesthetic analysis (provided by LLM)
- tips to click the image better (provided by LLM)
- tips to edit the image (provided by LLM)
There will also be another feature where once clicked, we can shall run another API call that will send image that will try to show how the image could have been clicked better based on the given suggestions. 

User Dashboard: This will have a display of all the images that the user has uploaded in the past for analysis. A overall analysis summary will be displayed when clicked on these images and a link that will take to its full analysis. 

Add placeholder images and text where ever there is an API call. Add the requirement code quality checks as well as test cases to checks as per requirement. 