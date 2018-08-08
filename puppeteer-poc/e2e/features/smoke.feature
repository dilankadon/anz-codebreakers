
Feature: Smoke Tests

  @done @run
  Scenario: 01 Basic Scenario - Land on home page and verify
    Given I land on the home page
    When You should eventually see heading "Codebreakers" in hero banner
    And You should eventually see sub-heading "Go Girl, Go For IT and ANZ" in hero banner
    And You should eventually see heading "Home"

    Then You should see "3" challenges displayed
    And You should see the "about-info" section
    And You should see heading "Go Girl, Go For IT!" in the "about-info" section
  
    And You should see heading "Easy" for challenge 1
    And You should see body text "Break the code to find out the name of the event." for challenge 1
    And You should see a button link "Let's have a go!" for challenge 1

    And You should see heading "Medium" for challenge 2
    And You should see body text "This code will let you know ANZ's core values." for challenge 2
    And You should see a button link "Time to step it up!" for challenge 2

    And You should see heading "Hard" for challenge 3
    And You should see body text "Breaking this code will show you ANZ's mission." for challenge 3
    And You should see a button link "Give me a challenge!" for challenge 3

    Then Click the button link "Let's have a go!" for challenge 1
    And You should be on the "easy" page
    And You should see the "easy-break-code" section
    And You should see the "how-to-play" section

    And You should see a "Go!" button
    And The "Go!" button is enabled
    And You should see a "I need a hint!" button
    And The "I need a hint!" button is disabled

    And The score text should display "Score: 0"
    And The hint text should display "3 hints left"

    Then Click the "Go!" button on the page
    And The "I need a hint!" button is enabled
    And You should see the game area displayed
    And You should see 5 groups of emojis

    And You should see a "Back to home" button
    And Click the "Back to home" button
    And You should be on the "home" page
  