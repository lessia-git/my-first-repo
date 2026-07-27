Feature: DemoQA UI Testing

    Background:
        Given the user is on the DemoQA home page

    Scenario: Fill Text Box form and verify output
        When the user navigates to the Text Box page
        And the user fills the Text Box form with:
            | field            | value                |
            | userName         | John Doe             |
            | email            | john.doe@example.com |
            | currentAddress   | 123 Main St          |
            | permanentAddress | 456 Second St        |
        And the user clicks the submit button
        Then the output should contain the correct user details:
            | field            | value                |
            | userName         | John Doe             |
            | email            | john.doe@example.com |
            | currentAddress   | 123 Main St          |
            | permanentAddress | 456 Second St        |

    Scenario: Buttons interactions
        When the user navigates to the Buttons page
        And the user double clicks the double click button
        Then the double click message "You have done a double click" should be visible
        When the user right clicks the right click button
        Then the right click message "You have done a right click" should be visible
        When the user clicks the dynamic click button
        Then the dynamic click message "You have done a dynamic click" should be visible

    Scenario: Navigate to Elements page and verify header
        When the user navigates to the Elements page
        Then the elements header message "Please select an item from left to start practice." should be visible
