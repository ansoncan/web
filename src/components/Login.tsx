  - url: 'https://pcpdfilm.starsknights.com:18888/api/v2'

1.	login feature, it includes user and staff, the API will return a token each time for each login.  
You should store the token and send the token for each authorization feature. 

2.  both account can change password.
3.	Only staff can access to "Add film page " page, a routing link should be available after login.
4.	There is one textbox available for staff to input the film name.  
    The film's detailed information will be loaded once the search button is clicked 
    through the designated API endpoint.
5.	The film information should be available for the staff editing 
    (Film name and poster cannot be changed.)
6.	There is a cancel button to go back to the film listed 
page and a save button to all the designated API endpoint to save the 
film information to the database.



/user:
    get:
      tags:
        - Users
      description:
        User Login
      security:        
        - basicAuth: []
      responses:
        "401":
          description: Invalid Login
        "200":
          description: Login successfully with a key provided
    put:
      tags:
        - Users
      description:
        Update user information (Owner account only)
      parameters:
        - in: header
          name: k
          schema:
            type: string
          required: true
      requestBody:
        description: Update user information
        required: true
        content:
          application/json:
            schema:
              $ref: ./user.json#/definitions/user
      responses:
        "500":
          description: Database return errors
        "200":
          description: Update successfully
  /user/detail:
    get:
      tags:
        - Users
      description:
        User Details Information
      security:
        - basicAuth: []
      parameters:
        - in: header
          name: k
          schema:
            type: string
          required: true
      responses:
        "401":
          description: Invalid Login
        "200":
          description: return user lastname and firstname
