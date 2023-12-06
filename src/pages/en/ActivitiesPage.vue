<template>
  <q-page padding>

    <p class="text-h5">
      Activities
    </p>
    <p>By clicking on the arrow, the options and suggested steps are displayed. Clicking on the titles with arrows, more details about the steps appear on the right.</p>

    <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 100%"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
            :nodes="simple"
            node-key="value"
            selected-color="primary"
            v-model:selected="selected"
            no-connectors

          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="selected"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
        <q-tab-panel name="defaultCorrect">
          <div class="text-h4 q-mb-md">Correct examples</div>
          <p>Navigate through the options on the left for more details about the desired step by step.</p>
        </q-tab-panel>
        <q-tab-panel name="defaultErroneous">
          <div class="text-h4 q-mb-md">Erroneous examples</div>
          <p>Navigate through the options on the left for more details about the desired step by step.</p>
        </q-tab-panel>
        <q-tab-panel name="correctBeginner">
          <div class="text-h4 q-mb-md">Correct example beginner student</div>
          <p>The beginner student is one who has not yet performed exercises on the content.</p>
          <p>For beginner students, an approach is suggested that begins with the professor demonstrating the construction of the model. </p>
          <p>After this step, the professor presents a domain to the students and asks them to construct the model for the presented domain. </p>
          <p>After the modeling performed by the students, the professor presents what the correct modeling would be and asks the students to correct their own models. After correcting the models, the students send the result to the professor.</p>
          <p>To finalize the activity, the professor can choose one of the suggested types of feedback</p>
        </q-tab-panel>

        <q-tab-panel name="correctIntermediate">
          <div class="text-h4 q-mb-md">Correct example intermediate student</div>
          <p>The intermediate student is one who has already performed some type of exercise that addresses the content to be explored.</p>
          <p>The professor starts by teaching students positive examples of the chosen model.</p>
          <p>Then, the professor presents a domain so that students can build a model according to the presented standards.</p>
          <p>To finalize the activity, the professor can choose one of the suggested types of feedback.</p>
        </q-tab-panel>

        <q-tab-panel name="erroneousBeginnerDomain">
          <div class="text-h4 q-mb-md">Erroneous example beginner student (domain)</div>
          <p>The beginner student is one who has not yet performed exercises on the content.</p>
          <p>The professor starts by presenting a domain for students to model.</p>
          <p>After the modeling performed by the students, the professor presents some anti-patterns and how to solve them.</p>
          <p>The next step will be the correction of the constructed models. For this, the professor can choose to provide an artifact that helps the students in this stage. This artifact can be a checklist with the taught anti-patterns or an inspection artifact.</p>
          <p>Regarding the correction of the diagrams, the professor can choose between the student correcting his own diagram or having him correct another student's diagram.</p>
          <p>To finalize the activity, the professor can choose one of the suggested types of feedback.</p>
        </q-tab-panel>

        <q-tab-panel name="erroneousBeginnerModel">
          <div class="text-h4 q-mb-md">Erroneous example beginner student (model with errors)</div>
          <p>The beginner student is one who has not yet performed exercises on the content.</p>
          <p>For beginner students, the suggestion is to use simpler models.</p>
          <p>The professor presents a model that contains errors, explains the existing errors and goes step by step to correct these errors.</p>
          <p>The professor presents another model and asks the students to locate the errors and construct a new model that presents the solution to the found errors.</p>
          <p>To finalize the activity, the professor can choose one of the suggested types of feedback.</p>
        </q-tab-panel>

        <q-tab-panel name="erroneousIntermediateModel">
          <div class="text-h4 q-mb-md">Erroneous example intermediate student - Using model with errors</div>
          <p>The intermediate student is one who has already performed some type of exercise that addresses the content to be explored.</p>
          <p>For intermediate students, the suggestion is to use more complex models.</p>
          <p>The professor presents a model that contains errors, explains the existing errors and goes step by step to correct these errors.</p>
          <p>The professor presents another model and asks the students to locate the errors and construct a new model that presents the solution to the found errors.</p>
          <p>To finalize the activity, the professor can choose one of the suggested types of feedback.</p>
        </q-tab-panel>

        <q-tab-panel name="erroneousIntermediateGame7errors">
          <div class="text-h4 q-mb-md">Erroneous example intermediate student - Game 7 errors</div>
          <p>The intermediate student is one who has already performed some type of exercise that addresses the content to be explored.</p>
          <p>The professor starts the activities by presenting a model with seven errors and explaining the rules of the game.</p>
          <p>Suggested rules: <br>
              Correctly found error and correct explanation of the reason: 10 points <br>
              Correctly found error, however, incorrect explanation: 5 points <br>
              Podium: The three students with the highest score.</p>
          <p>Then, the activity enters a loop in which the students try to locate the errors present in the model. Each located error needs to be justified by the student before the room and then the professor validates the explanation. This repeats until no more errors are pointed out by the students.</p>
          <p>Finally, the professor checks if any existing error was not located by the students. If there is, the professor explains the error and ends the activity by demonstrating the correction of the model.</p>
        </q-tab-panel>

        <q-tab-panel name="erroneousIntermediateIdentifying">
          <div class="text-h4 q-mb-md">Erroneous example intermediate student - Students identifying errors</div>
          <p>The activity starts with the professor presenting a model with errors.</p>
          <p>Next, the professor sets a time for the students to identify the existing errors.</p>
          <p>After the students report the errors, the professor corrects the identified errors.</p>
          <p>The professor can choose whether or not to present a class with the anti-patterns related to the model's errors and shows how to solve them.</p>
          <p>To finalize the activity, the professor shows the errors not found (if any) and demonstrates the correction of the diagram.</p>
        </q-tab-panel>

        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ActivitiesPage',

  setup () {
    return {
      splitterModel: ref(30),
      selected: ref('defaultCorrect'),

      simple: [
        {
          label: 'Correct example',
          value: 'defaultCorrect',
          children: [
            {
              label: 'Beginner Student',
              value: 'correctBeginner',
              children: [
                {
                  label: '- Choose the example',
                  disabled: true
                },
                {
                  label: '- Professor performs the demonstration',
                  disabled: true
                },
                {
                  label: '- Present a domain',
                  disabled: true
                },
                {
                  label: '- Students perform the modeling',
                  disabled: true
                },
                {
                  label: '- Professor performs the demonstration',
                  disabled: true
                },
                {
                  label: '- Students correct the model',
                  disabled: true
                },
                {
                  label: '- Feedback',
                  disabled: true
                }
              ]
            },
            {
              label: 'Intermediate Student',
              value: 'correctIntermediate',
              children: [
                {
                  label: '- Choose a positive example',
                  disabled: true
                },
                {
                  label: '- Professor teaches the example',
                  disabled: true
                },
                {
                  label: '- Present a domain',
                  disabled: true
                },
                {
                  label: '- Students perform the modeling',
                  disabled: true
                },
                {
                  label: '- Feedback',
                  disabled: true
                }
              ]
            }
          ]
        },
        {
          label: 'Erroneous example',
          value: 'defaultErroneous',
          children: [
            {
              label: 'Beginner Student',
              value: 'erroneousBeginner',
              children: [
                {
                  label: 'Domain Modeling',
                  value: 'erroneousBeginnerDomain',
                  children: [
                    {
                      label: '- Present a domain',
                      disabled: true
                    },
                    {
                      label: '- Students perform modeling',
                      disabled: true
                    },
                    {
                      label: '- Identify anti-patterns',
                      disabled: true
                    },
                    {
                      label: '- Explanation of anti-patterns',
                      disabled: true
                    },
                    {
                      label: '- Students correct their diagrams',
                      disabled: true
                    },
                    {
                      label: '- Students create a new version of the diagrams',
                      disabled: true
                    },
                    {
                      label: '- Feedback',
                      disabled: true
                    }

                  ]
                },
                {
                  label: 'Error-prone Model',
                  value: 'erroneousBeginnerModel',
                  children: [
                    {
                      label: '- Present a model with errors',
                      disabled: true
                    },
                    {
                      label: '- Professor explains the model errors',
                      disabled: true
                    },
                    {
                      label: '- Professor demonstrates the correction',
                      disabled: true
                    },
                    {
                      label: '- Professor presents another model',
                      disabled: true
                    },
                    {
                      label: '- Students identify the errors',
                      disabled: true
                    },
                    {
                      label: '- Students correct the model',
                      disabled: true
                    },
                    {
                      label: '- Feedback',
                      disabled: true
                    }
                  ]
                }
              ]
            },
            {
              label: 'Intermediate Student',
              value: 'erroneousIntermediate',
              children: [
                {
                  label: 'Error-prone Model',
                  value: 'erroneousIntermediateModel',
                  children: [
                    {
                      label: '- Present a model with errors',
                      disabled: true
                    },
                    {
                      label: '- Professor explains the model errors',
                      disabled: true
                    },
                    {
                      label: '- Professor demonstrates the correction',
                      disabled: true
                    },
                    {
                      label: '- Professor presents another model',
                      disabled: true
                    },
                    {
                      label: '- Students identify the errors',
                      disabled: true
                    },
                    {
                      label: '- Students correct the model',
                      disabled: true
                    },
                    {
                      label: '- Feedback',
                      disabled: true
                    }
                  ]
                },
                {
                  label: 'Spot the 7 Errors Game',
                  value: 'erroneousIntermediateGame7errors',
                  children: [
                    {
                      label: '- Professor presents a model with 7 errors',
                      disabled: true
                    },
                    {
                      label: '- Students try to find the errors',
                      disabled: true
                    },
                    {
                      label: '- Student explains the reason for the identified error',
                      disabled: true
                    },
                    {
                      label: '- Professor validates the identified error',
                      disabled: true
                    },
                    {
                      label: '- If any error is not found, the professor explains the error',
                      disabled: true
                    },
                    {
                      label: "- Professor demonstrates the corrections for the model's errors",
                      disabled: true
                    }
                  ]
                },
                {
                  label: 'Students Identifying Errors',
                  value: 'erroneousIntermediateIdentifying',
                  children: [
                    {
                      label: '- Professor presents a model with errors',
                      disabled: true
                    },
                    {
                      label: '- Professor sets a time for students to identify the errors',
                      disabled: true
                    },
                    {
                      label: '- Students report the identified errors',
                      disabled: true
                    },
                    {
                      label: '- Professor corrects the identified errors',
                      disabled: true
                    },
                    {
                      label: '- Professor highlights the errors not found',
                      disabled: true
                    },
                    {
                      label: '- Optional: Presentation of anti-patterns',
                      disabled: true
                    },
                    {
                      label: "- Professor demonstrates the corrections for the model's errors",
                      disabled: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
})

</script>
