'use strict';

/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

 var dietRequirementsList = [
  "normal",
  "vegetarian",
  "pescetarian",
  "ovo-vegetarian",
  "lacto-vegetarian",
  "lacto-ovo-vegetarian",
  "lactose free",
  "gluten free",
  "veg free",
  "vegan",
  "halal",
  "no fish",
  "no peanut",
  "no egg",
  "no soy",
  "no beef",
  "hindu",
  "kosher"
  ]

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `Meal Info`,
            content: `${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to your flight from London to Los Angeles. ' +
        'Please tell me your dietary requirements, such as, i am vegan';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Please tell me your dietary requirements by saying, ' +
        'i am vegan';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you and enjoy your meal!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createDietReqAttributes(dietReq) {
    return {
        dietReq,
    };
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function setDietReqInSession(intent, session, callback) {
    const cardTitle = intent.name;
    const dietReqSlot = intent.slots.DietReq;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (dietReqSlot) {
        const req = dietReqSlot.value;
        if(dietRequirementsList.indexOf(req) > -1 ){
          sessionAttributes = createDietReqAttributes(req);
          speechOutput = `I now know your dietary requirement is ${req}. You can ask me ` +
              "what is my meal?";
          repromptText = "You can ask me for your meal by saying, what is my meal?";
        }
        else {
            speechOutput = "I'm not sure what your requirement is. Please try again.";
            repromptText = "I'm not sure what your requirement is. You can tell me by saying, " +
                'I am vegan.';
        }
    } else {
        speechOutput = "I'm not sure what your requirement is. Please try again.";
        repromptText = "I'm not sure what your requirement is. You can tell me by saying, " +
            'I am vegan.';
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getMealFromSession(intent, session, callback) {
    let dietReq;
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = true;
    let speechOutput = '';

    if (session.attributes) {
        dietReq = session.attributes.dietReq;
    }

    let typeDietReq = dietRequirementsList.indexOf(dietReq);
    switch(typeDietReq){
        case 0:
          speechOutput = `Your meal is Beef Burritos. Enjoy!`;
          break;
        case 1:
          speechOutput = `Your meal is rice and tofu. Enjoy!`;
          break;
        case 2:
          speechOutput = `Your meal is rice and steamed fish. Enjoy!`;
          break ;
        case 3:
          speechOutput = `Your meal is omelettes. Enjoy!`;
          break;
        case 4:
          speechOutput = `Your meal is rice and tofu. Enjoy!`;
          break;
        case 5:
          speechOutput = `Your meal is rice and tofu. Enjoy!`;
          break;
        case 6:
          speechOutput = `Your meal is Chicken Burritos. Enjoy!`;
          break;
        case 7:
          speechOutput = `Your meal is rice and steamed fish. Enjoy!`;
          break;
        case 8:
          speechOutput = `Your meal is Meat Deluxe Pizza. Enjoy!`;
          break;
        case 9:
          speechOutput = `Your meal is rice and tofu. Enjoy!`;
          break;
        case 10:
          speechOutput = `Your meal is fish roe linguini. Enjoy!`;
          break;
        case 11:
          speechOutput = `Your meal is Beef Burritos. Enjoy!`;
          break;
        case 12:
          speechOutput = `Your meal is Beef Burritos. Enjoy!`;
          break;
        case 13:
          speechOutput = `Your meal is Beef Burritos. Enjoy!`;
          break;
        case 14:
          speechOutput = `Your meal is Beef Burritos. Enjoy!`;
          break;
        case 15:
          speechOutput = `Your meal is Chicken Burritos. Enjoy!`;
          break;
        case 16:
          speechOutput = `Your meal is rice and tofu. Enjoy!`;
          break;
        case 17:
          speechOutput = `Your meal is rice and steamed fish. Enjoy!`;
          break;
        default:
          speechOutput = "I'm not sure what your requirement is, you can say, my dietary requirement is vegetarian.";
          shouldEndSession = false;
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'DietReqIntent') {
        setDietReqInSession(intent, session, callback);
    } else if (intentName === 'WhatsMyMealIntent') {
        getMealFromSession(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
