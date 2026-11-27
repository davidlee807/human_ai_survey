// Everything participants read. Replace the [PLACEHOLDER] text.
//
// Agent messages are keyed first by the AGENTS' verdict, then by the
// PARTICIPANT's verdict: agent_messages.YTA.ESH.Cody is what Cody says when he
// argues YTA to someone who said ESH. Which verdict the agents argue:
//   participant YTA -> agents NTA
//   participant NTA -> agents YTA
//   participant ESH or NAH -> agents YTA or NTA, 50/50 at random
// So each agent has three explanations for YTA and three for NTA, per post.
//
// There are two styles, and every participant sees both (one per post):
//   humanlike: the five named agents introduce themselves and each posts its message
//              (agent_messages below).
//   factual:   no introductions; one machine-style pros/cons list with the same points,
//              each marked with the agents that agree with it (FACTUAL_LISTS below).

// "intro" is what each agent says when introducing themselves at the start of the chat.
const AGENTS = [
  { name: "Cody",   color: "#7b9bd1", intro: "Hi everyone, my name is Cody. Nice to meet you!" },
  { name: "Bella",  color: "#8fbf9a", intro: "Hey! I'm Bella. Looking forward to chatting with you all." },
  { name: "Nathan", color: "#d4a95f", intro: "Hello, I'm Nathan. Glad to be here." },
  { name: "Zoe",    color: "#b98cc0", intro: "Hi, I'm Zoe! Nice to meet you." },
  { name: "Mario",  color: "#d9897a", intro: "Hi all, Mario here. Great to meet everyone." },
];

const HOST = { name: "Host", color: "#333333" };

const POSTS = {
  A: {
    title: "AITA for telling a mother that maybe her teenage son needs to toughen up?",
    body: `<p>Earlier in the week the mother of one of my son’s classmates came over to discuss a problem between our boys. I guess my son has been telling her son that he stinks, is gross, and so on. I told her I would talk to my son about it and we exchanged numbers in case there were any other problems.</p>
      <p>I talked to my son and he didn’t deny it. He says the boy does smell really bad and is assigned to sit next to him in one of their classes. I told him to just try to ignore it and just stay away from him otherwise.</p>
      <p>Last night I got a call from the classmate’s mother saying that my son had picked on her’s again during lunch and that he was upset again. I confronted my son about it and he said that her son has been purposely sitting across from him at lunch because he knows that it bothers my son.</p>
      <p>I called the classmate’s mother back and told her what my son had said. I told her that it’s not ok that my son was rude, but to be fair no one wants to smell bad hygiene while they’re trying to eat. And also if her son was going to go out of his way to put himself in that position then maybe he should toughen up a bit.</p>
      <p>She just hung up on me. I don’t condone bullying and have talked to my son about it again, but at the same time I don’t feel my viewpoint on it is all that ridiculous.</p>`,
    agent_messages: {
      NTA: {
        // The participant said YTA
        YTA: {
          Cody:   "I'd say NTA. YTA doesn't really fit, since OP took the complaint seriously both times and talked to their son after each one. A parent who keeps following up like that isn't brushing the bullying off, so the conflict isn't coming from OP.",
          Bella:  "To me this is NTA. YTA feels off because OP opened the callback by saying their son's rudeness wasn't okay, which shows real respect for how the other boy felt. The mother hanging up meant OP's honest attempt to explain both kids' sides never got heard.",
          Nathan: "This reads as NTA. YTA skips the order of events: after the first visit, OP told their son to stay away from the boy outside of class. The next problem happened when the classmate sat across from him at lunch, so the new conflict started with the classmate's choice.",
          Zoe:    "I'm going with NTA. YTA overlooks the lunch detail, where the classmate sat across from OP's son on purpose because he knew it bothered him. OP's toughen-up comment was a response to that specific choice, and pointing out that someone keeps walking into the same situation is fair.",
          "Mario": "My take is NTA. YTA treats OP's phone call as the problem, but OP was entitled to pass along their own son's account when the mother called with a complaint. Sharing both sides is a normal part of two parents working out a problem between their kids."
        },
        // The participant said ESH
        ESH: {
          "Cody": "I'd say NTA. The classmate sitting across from OP's son on purpose wasn't great, but ESH doesn't fit because OP's toughen-up line was blunt, not cruel. It was tied directly to the boy choosing that seat, not a dig at him as a person.",
      "Bella": "To me this is NTA. I get why ESH comes up, since the mother hanging up was cold, but OP started the call by admitting their son's rudeness wasn't okay. That kind of honesty about your own kid's behavior is caring toward the other family, not something to count against OP.",
      "Nathan": "This reads as NTA. The mother ending the call was a poor move, but ESH misses how OP handled each step: listening at the first visit, exchanging numbers, talking to their son, then calling back. Every step OP took was aimed at solving the problem rather than adding to it.",
      "Zoe": "I'm going with NTA. The classmate choosing that lunch seat wasn't fair to OP's son, and ESH counts OP's hygiene remark against them, but the point was specifically about eating. Not wanting to smell something unpleasant during a meal is an ordinary reaction, not an insult from OP.",
      "Mario": "My take is NTA. The mother hanging up was rude, but ESH asks OP to have handled it perfectly, and OP was entitled to report what their son said when she called. Relaying your own kid's account is a reasonable thing for a parent to do, not a wrong."
        },
        // The participant said NAH
        NAH: {
          "Cody": "I'd say NTA. NAH lets the mother off too easily, because she hung up on OP in the middle of a conversation about their kids. Ending a call that way isn't a misunderstanding, it's refusing to hear the other side out at all.",
      "Bella": "To me this is NTA. NAH treats the lunch trouble like bad luck, but the classmate sat across from OP's son because he knew it would bother him. Deliberately setting up a situation that upsets someone else is unkind, even if he was hurt by the insults earlier.",
      "Nathan": "This reads as NTA. NAH assumes things just went wrong, but look at the sequence: OP told their son to keep away, and then the classmate moved toward him at lunch. The second incident followed a step the classmate took after the first one had been handled.",
      "Zoe": "I'm going with NTA. NAH would make sense for the classroom, since the seating there was assigned and nobody chose it. Lunch is different, because the classmate picked the seat across from OP's son himself, so that part was a decision rather than bad luck.",
      "Mario": "My take is NTA. NAH doesn't account for the mother asking OP to handle their son twice, then hanging up once OP raised her own son's part. Expecting one family to fix things while refusing to consider the other side isn't a mix-up, it's a real failing on her end."
        },
      },
      YTA: {
        // The participant said NTA
        NTA: {
          "Cody": "I'd say YTA. NTA leans on the classmate sitting nearby, but OP's son admitted calling him gross and smelly, and OP answered the mother by telling her son to toughen up. That turns a bullying complaint into the bullied kid's problem.",
      "Bella": "To me this is YTA. NTA focuses on OP's son being bothered, but the other boy was upset enough that his mother came over and then called again. Hearing that her son ought to toughen up after all that would hurt any parent, so hanging up makes sense.",
      "Nathan": "This reads as YTA. NTA gives OP credit for talking to their son, but in that first talk OP only told him to ignore the smell and stay away. The insults themselves weren't addressed then, so the lunch incident followed from how OP handled the first complaint.",
      "Zoe": "I'm going with YTA. NTA treats the hygiene point as fair, but OP used the boy's smell to explain why their son's comments were understandable. Pointing to a kid's body odor as the reason he gets picked on puts the blame on him for being bullied.",
      "Mario": "My take is YTA. NTA says the classmate chose to sit there, but even if that's true, OP's son could move seats at lunch. OP could have simply agreed to talk to their son again instead of adding a lecture about the other boy toughening up."
        },
        // The participant said ESH
        ESH: {
          "Cody": "I'd say YTA. ESH counts the mother hanging up, but that's a small thing next to OP telling her that her bullied son ought to toughen up. Ending a call after hearing that is a pretty normal reaction from a parent.",
      "Bella": "To me this is YTA. ESH puts some blame on the classmate, but he's a teenager who has been called gross and smelly, and the idea that he sits there on purpose is only OP's son's account. The hurt on his side is real, while OP chose to make it worse.",
      "Nathan": "This reads as YTA. ESH suggests both parents slipped, but the mother came over in person, agreed to swap numbers, and called when it happened again. She followed a reasonable process each time, and the only escalation in that sequence came from OP's comments.",
      "Zoe": "I'm going with YTA. ESH treats the classmate's smell as part of the problem, but having poor hygiene isn't doing anything wrong to anyone. OP brought it up as if it explained the insults, which shifts blame onto a kid for something that isn't a fault.",
      "Mario": "My take is YTA. ESH spreads the blame, but the mother did about all a parent can do, which is raise it with the other parent. OP had promised to deal with their son and could have stuck to that, rather than turning the call back on her son."

        },
        // The participant said NAH
        NAH: {
          "Cody": "I'd say YTA. NAH makes it sound like a misunderstanding, but OP knowingly told a mother her son ought to toughen up after he was bullied. That was a choice OP made on the call, not an accident or a slip of the tongue.",
      "Bella": "To me this is YTA. NAH misses how upset the boy already was, since his mother had to step in twice. OP's words told her that her son's hurt didn't count for much, and that adds to the harm rather than being a harmless difference of opinion.",
      "Nathan": "This reads as YTA. NAH would fit if OP lacked information, but by the second call OP knew their son had insulted the boy and kept doing it. Blaming the classmate with all of that known is a decision, not an honest mistake.",
      "Zoe": "I'm going with YTA. NAH frames this as a clash over the smell, but OP's son calling a classmate gross and stinky is bullying, not a preference. OP then repeated the hygiene point to the boy's mother, which goes past disagreeing into shaming.",
      "Mario": "My take is YTA. NAH overlooks OP's first instruction, which was to ignore the smell and stay away instead of stopping the insults. That treated the other boy as the problem, and the insults came up again at lunch soon after."
        },
      },
    },
  },
  B: {
    title: "AITA for ruining someone's filming?",
    body: `<p>I was walking back home today when someone with a camera was filming a video of sorts on the pavement. As I was walking one person somewhat rudely gestured at me to walk on the road for a few meters (essentially used her hands to aggressively point to the road) so I can go around the filming and walk on the road for a bit. This pissed me off as 1. They didn't have any right to occupy the pavement 2. They were rude about it. Because of this I ignored their demand and just walked in front of the camera</p>`,
    agent_messages: {
      NTA: {
        // The participant said YTA
        YTA: {
          "Cody": "I'd say NTA. YTA doesn't fit because OP was just walking home on a public pavement. The film crew doesn't get to claim that space for themselves. They can ask nicely, but OP isn't required to step into the road so their shot works out.",
      "Bella": "To me this is NTA, since the YTA reading skips over how OP was treated first. Getting jabbed toward the road by a stranger's hands feels like being ordered around, not asked. It makes sense OP felt brushed aside, and refusing that kind of demand isn't a cruel thing to do.",
      "Nathan": "This reads as NTA rather than YTA. OP was walking home, the crew was in the way, and OP was the one asked to change course. OP then kept going on the same path they were already on, which is ignoring a demand, not creating a problem.",
      "Zoe": "I'm going with NTA, because the YTA view treats the request as small when it wasn't. The detail that stands out is that OP was pointed onto the road itself. Stepping out where cars drive, even for a few meters, is a real ask, and declining it is reasonable.",
      "Mario": "I'd call it NTA, since OP's walk doesn't make them the one at fault the way YTA suggests. OP was entitled to use the pavement like anyone else. Filming somewhere public means planning around people passing through, like pausing for a few seconds, rather than sending pedestrians into the road."
        },
        // The participant said ESH
        ESH: {
          Cody:   "I think it's NTA, not ESH. The person pointing at the road was rude, no argument there. But OP walking past a camera on a public pavement isn't a wrong on their side. OP just went where they were already going and didn't do anything beyond that.",
      "Bella": "I'd say NTA rather than ESH. That aggressive pointing would make most people feel disrespected. The crew might feel annoyed that a take got interrupted, but feeling annoyed isn't the same as being wronged, and OP's reaction to being treated that way stayed pretty mild.",
      "Nathan": "This reads as NTA, not ESH. First the crew member was rude, then OP simply carried on walking. ESH would require OP to have done something extra, like stopping in the shot or starting an argument, and the post describes none of that.",
      "Zoe": "I'm going with NTA over ESH. The detail that matters is where OP was sent, which was the road. Saying no to walking among traffic isn't a fault, so the only one who behaved badly here is the person doing the aggressive pointing.",
      "Mario": "I'd call it NTA instead of ESH. The crew member was out of line, but OP didn't owe the crew any help with their video. OP was entitled to the pavement, and the crew could have waited a moment for OP to pass instead of treating the walkway as theirs."
        },
        // The participant said NAH
        NAH: {
          "Cody": "I'd say NTA rather than NAH. Someone did act badly here, and it was the person who gestured. Pointing a stranger aggressively toward the road isn't a mix-up or a bad moment. It's just rude, and that makes them the one in the wrong.",
      "Bella": "To me this is NTA, not NAH. Being waved toward the road with an aggressive gesture would leave most people feeling small and ignored. That person chose to treat OP that way, and calling it nobody's fault lets them off for how they made OP feel.",
      "Nathan": "This reads as NTA instead of NAH. The crew chose to film on the pavement, and then one of them told OP to leave it for the road. Both steps put the cost on OP, and that pattern is a choice they made, not bad luck.",
      "Zoe": "I'm going with NTA over NAH. What stands out is that the person never asked OP anything and just pointed hard at the road. A polite word would have been easy, so skipping it is rudeness rather than a misunderstanding.",
      "Mario": "I'd call it NTA, not NAH. The crew had easy options, like pausing for a few seconds while OP walked by. Choosing instead to direct a pedestrian into the road puts their video ahead of OP's safety, and that's on them."
        },
      },
      YTA: {
        // The participant said NTA
        NTA: {
         "Cody": "I'd say YTA. NTA doesn't fit because OP admits walking in front of the camera on purpose, out of annoyance. That's not just using the pavement. It's choosing to mess up someone's video to get back at them for a gesture.",
      "Bella": "To me this is YTA rather than NTA. Only one person made the rude gesture, but walking through the shot spoiled things for the person holding the camera too. They hadn't done anything to OP, and they likely ended up frustrated over a take that got ruined.",
      "Nathan": "This reads as YTA, not NTA. A crew member gestured rudely, and OP responded by walking into the shot to ruin the filming. Each step got worse, and OP was the one who turned a brief rude moment into actual damage to someone's work.",
      "Zoe": "I'm going with YTA over NTA. The detail that sticks out is that the detour was only a few meters. Being asked to step around a shot for a few seconds is a small favour, and OP turned it down in a way that wrecked the filming.",
      "Mario": "I'd call it YTA instead of NTA. Even if the crew had no right to the pavement, OP had better options, like waiting a moment, speaking up about the rude gesture, or walking behind the camera. Walking straight through the shot was the least fair choice."
        },
        // The participant said ESH
        ESH: {
          "Cody": "I think it's YTA, not ESH. A rude hand gesture is a small thing. Ruining someone's filming on purpose is a much bigger thing. Next to what OP did, the gesture doesn't really count as the crew member being in the wrong.",
      "Bella": "To me this is YTA rather than ESH. The person gesturing was probably focused on getting the shot and a bit stressed about people walking into it. That makes the abrupt pointing understandable, while OP chose to make the situation worse on purpose.",
      "Nathan": "This reads as YTA instead of ESH. The crew member's gesture was a request, even a rude one, and it cost OP nothing unless OP went along with it. OP's walk through the shot was an action with a real cost, which puts the blame on OP.",
      "Zoe": "I'm going with YTA over ESH. OP says the gesture made them angry, and the post shows that anger led straight to walking in front of the camera. The crew member was abrupt for a moment, but OP acted on purpose to get back at them.",
      "Mario": "I'd call it YTA, not ESH. Asking people to step around a shot for a moment is a normal request, and blunt delivery doesn't make it wrong. OP was free to say no politely and keep walking, but deliberately walking into the shot went well past that."
        },
        // The participant said NAH
        NAH: {
          "Cody": "I'd say YTA rather than NAH. All OP was asked for was a detour of a few meters. Turning that down is one thing. Walking into the shot instead isn't an honest mistake, and it isn't just two people wanting different things either.",
      "Bella": "To me this is YTA, not NAH. Someone was putting effort into that video, and OP walking through the shot likely left them frustrated and set back. Spoiling someone's work because you felt slighted goes past a clash of preferences into being unkind.",
      "Nathan": "This reads as YTA instead of NAH. OP lists two reasons for being annoyed, and then says those reasons are why they walked in front of the camera. That sequence shows a deliberate decision, so it can't be treated as an honest mistake.",
      "Zoe": "I'm going with YTA over NAH. The title itself says OP ruined someone's filming, so OP knew the effect of what they did. Ruining something on purpose crosses a line, even if both sides just wanted to use the same pavement.",
      "Mario": "I'd call it YTA, not NAH. OP was entitled to refuse the detour and keep walking normally. Deliberately putting themselves in front of the camera is different from refusing, because it goes beyond protecting OP's own space to spoiling the crew's work."
        },
      },
    },
  },
};

// ---------------------------------------------------------------------------
// FACTUAL CONDITION
// The same arguments as agent_messages above, rewritten as one machine-style
// pros/cons list per cell: FACTUAL_LISTS[post][agents' verdict][participant's verdict].
//   pros = points for the agents' verdict, cons = points against the participant's verdict.
// Each point names the agents that agree with it (by the names in AGENTS; they are
// shown with the labels in FACTUAL.labels). Each point is one agent's message from the
// humanlike condition, and the 2nd and 4th agents are also listed on the point of the
// agent before them, which mirrors "I agree with Cody/Nathan" in the humanlike chat.
const FACTUAL = {
  // Shown as the sender of the list in the chat.
  sender: "Agent output",
  color: "#6b7280",
  // How each agent is named in the list. Neutral labels, so the factual chat has no names.
  labels: { Cody: "Agent 1", Bella: "Agent 2", Nathan: "Agent 3", Zoe: "Agent 4", Mario: "Agent 5" },
};

const FACTUAL_LISTS = {
  A: {
    NTA: {
      YTA: {
        pros: [
          { agents: ["Cody", "Bella"], text: "OP acted on both complaints and spoke to their son after each one. Repeated follow-up is not dismissal of the bullying." },
          { agents: ["Bella"], text: "OP opened the callback by stating that their son's rudeness was not okay. The mother hung up before OP's account of both children was heard." },
          { agents: ["Mario"], text: "OP relayed their own son's account after the mother called with a complaint. Sharing both sides is a standard step when two parents resolve a conflict between their children." },
        ],
        cons: [
          { agents: ["Nathan", "Zoe"], text: "YTA omits the order of events. After the first visit, OP told their son to stay away from the classmate outside class. The next conflict began when the classmate sat across from him at lunch." },
          { agents: ["Zoe"], text: "YTA omits that the classmate sat across from OP's son on purpose, knowing it bothered him. OP's \"toughen up\" comment referred to that specific choice." },
        ],
      },
      ESH: {
        pros: [
          { agents: ["Bella"], text: "OP began the call by stating that their son's rudeness was not okay. This is an acknowledgement of their own child's behavior toward the other family." },
          { agents: ["Nathan", "Zoe"], text: "OP's steps: listened at the first visit, exchanged numbers, spoke to their son, called back. Each step was directed at resolving the problem." },
          { agents: ["Mario"], text: "The mother hung up on OP. OP reported their son's account when she called, which is a standard parental action." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "The classmate chose to sit across from OP's son. OP's \"toughen up\" line was blunt, but it referred to that seat choice, not to the boy as a person." },
          { agents: ["Zoe"], text: "ESH counts OP's hygiene remark against OP. The remark concerned smell during meals, which is an ordinary reaction, not an insult." },
        ],
      },
      NAH: {
        pros: [
          { agents: ["Bella"], text: "The classmate sat across from OP's son because he knew it would bother him. Deliberately creating a situation that upsets someone is unkind, regardless of the earlier insults." },
          { agents: ["Nathan", "Zoe"], text: "Sequence: OP told their son to keep away from the classmate. Afterwards, the classmate moved toward him at lunch. The second incident followed the classmate's action." },
          { agents: ["Mario"], text: "The mother asked OP to address their son twice, then hung up when OP raised her son's part. Requiring one family to act while refusing to consider the other side is a failing on her part." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "NAH does not account for the mother hanging up mid-conversation. Ending the call was a refusal to hear the other side, not a misunderstanding." },
          { agents: ["Zoe"], text: "NAH applies to the classroom, where seating was assigned. It does not apply to lunch, where the classmate chose the seat himself." },
        ],
      },
    },
    YTA: {
      NTA: {
        pros: [
          { agents: ["Cody", "Bella"], text: "OP's son admitted calling the classmate gross and smelly. OP responded to the mother by saying her son should toughen up, which makes the bullying complaint the bullied child's problem." },
          { agents: ["Bella"], text: "The classmate was upset enough that his mother came over and then called again. After two complaints, being told her son should toughen up makes hanging up an expected response." },
          { agents: ["Mario"], text: "Even if the classmate chose the seat, OP's son could move seats at lunch. OP could have agreed to talk to their son again without adding that the other boy should toughen up." },
        ],
        cons: [
          { agents: ["Nathan", "Zoe"], text: "NTA credits OP for talking to their son. In the first talk, OP only told him to ignore the smell and stay away. The insults were not addressed, and the lunch incident followed." },
          { agents: ["Zoe"], text: "NTA treats the hygiene point as fair. OP used the boy's smell to explain why their son's comments were understandable, which places the blame for the bullying on the bullied child." },
        ],
      },
      ESH: {
        pros: [
          { agents: ["Nathan", "Zoe"], text: "The mother came over in person, agreed to exchange numbers, and called when it happened again. Each step was reasonable. The only escalation in the sequence came from OP's comments." },
          { agents: ["Mario"], text: "The mother raised the issue with the other parent, which is the expected action. OP had promised to deal with their son and could have kept to that instead of turning the call back on her son." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "ESH counts the mother hanging up. That is minor compared with OP telling her that her bullied son should toughen up. Ending a call after that statement is a normal parental reaction." },
          { agents: ["Bella"], text: "ESH puts some blame on the classmate. He is a teenager who was called gross and smelly, and the claim that he sits there on purpose comes only from OP's son." },
          { agents: ["Zoe"], text: "ESH treats the classmate's smell as part of the problem. Poor hygiene is not a wrong done to anyone, and OP presented it as an explanation for the insults." },
        ],
      },
      NAH: {
        pros: [
          { agents: ["Bella"], text: "The classmate was already upset, and his mother had to step in twice. OP's statement told her that her son's hurt did not count for much, which adds to the harm." },
          { agents: ["Zoe"], text: "Calling a classmate gross and stinky is bullying, not a preference. OP repeated the hygiene point to the boy's mother, which is shaming, not disagreement." },
          { agents: ["Mario"], text: "OP's first instruction was to ignore the smell and stay away, not to stop the insults. This treated the other boy as the problem, and the insults recurred at lunch." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "NAH frames this as a misunderstanding. OP knowingly told a mother that her bullied son should toughen up. This was a choice made on the call, not an accident." },
          { agents: ["Nathan", "Zoe"], text: "NAH would apply if OP lacked information. By the second call, OP knew their son had insulted the boy repeatedly. Blaming the classmate with that knowledge is a decision, not a mistake." },
        ],
      },
    },
  },
  B: {
    NTA: {
      YTA: {
        pros: [
          { agents: ["Cody", "Bella"], text: "OP was walking home on a public pavement. The film crew cannot claim that space. OP is not required to step into the road so the shot works." },
          { agents: ["Nathan", "Zoe"], text: "OP was walking home, the crew was in the way, and OP was asked to change course. OP continued on the same path, which is ignoring a demand, not creating a problem." },
          { agents: ["Mario"], text: "OP had the same right to the pavement as anyone. Filming in a public place requires planning around passers-by, for example pausing for a few seconds." },
        ],
        cons: [
          { agents: ["Bella"], text: "YTA omits how OP was treated first. OP was directed toward the road with an aggressive hand gesture, which is an order, not a request. Refusing it is not cruel." },
          { agents: ["Zoe"], text: "YTA treats the request as small. OP was directed onto the road itself, where cars drive. Declining to walk there, even for a few meters, is reasonable." },
        ],
      },
      ESH: {
        pros: [
          { agents: ["Cody", "Bella"], text: "The person pointing at the road was rude. OP walking past a camera on a public pavement is not a wrong. OP continued where they were already going and did nothing further." },
          { agents: ["Zoe"], text: "OP was directed into the road. Declining to walk among traffic is not a fault. The only person who behaved badly is the one who pointed aggressively." },
          { agents: ["Mario"], text: "The crew member was out of line, and OP did not owe the crew help with their video. The crew could have waited a moment for OP to pass." },
        ],
        cons: [
          { agents: ["Bella"], text: "ESH counts the interrupted take against OP. Aggressive pointing is disrespectful. The crew being annoyed is not the same as being wronged, and OP's reaction was mild." },
          { agents: ["Nathan", "Zoe"], text: "ESH requires OP to have done something additional, such as stopping in the shot or starting an argument. The post describes none of that. Sequence: the crew member was rude, then OP kept walking." },
        ],
      },
      NAH: {
        pros: [
          { agents: ["Nathan", "Zoe"], text: "The crew chose to film on the pavement, then told OP to leave it for the road. Both steps placed the cost on OP. This was the crew's choice, not chance." },
          { agents: ["Zoe"], text: "The person did not ask OP anything and pointed hard at the road. A polite request was an easy option, so skipping it is rudeness, not a misunderstanding." },
          { agents: ["Mario"], text: "The crew had easy options, such as pausing for a few seconds while OP passed. Directing a pedestrian into the road put the video ahead of OP's safety." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "NAH does not account for the person who gestured. Aggressively pointing a stranger toward the road is rude, not a mix-up, which puts that person in the wrong." },
          { agents: ["Bella"], text: "NAH calls it nobody's fault. The person chose to wave OP toward the road with an aggressive gesture, and NAH excuses that treatment." },
        ],
      },
    },
    YTA: {
      NTA: {
        pros: [
          { agents: ["Bella"], text: "Only one person made the rude gesture. Walking through the shot also spoiled the take for the person holding the camera, who had done nothing to OP." },
          { agents: ["Nathan", "Zoe"], text: "Sequence: a crew member gestured rudely, then OP walked into the shot to ruin the filming. OP turned a brief rude moment into damage to someone's work." },
          { agents: ["Mario"], text: "Even if the crew had no right to the pavement, OP had other options: wait a moment, object to the gesture, or walk behind the camera. Walking through the shot was the least fair option." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "NTA does not account for OP admitting they walked in front of the camera on purpose, out of annoyance. That is not just using the pavement. It is ruining a video in retaliation for a gesture." },
          { agents: ["Zoe"], text: "NTA treats the request as large. The detour was a few meters. Stepping around a shot for a few seconds is a small favor, and OP refused it in a way that ruined the filming." },
        ],
      },
      ESH: {
        pros: [
          { agents: ["Nathan", "Zoe"], text: "The gesture was a request, even if rude, and cost OP nothing unless OP complied. Walking through the shot was an action with a real cost, which places the blame on OP." },
          { agents: ["Zoe"], text: "OP states that the gesture made them angry, and that this led directly to walking in front of the camera. OP acted on purpose, in retaliation." },
          { agents: ["Mario"], text: "Asking people to step around a shot is a normal request. Blunt delivery does not make it wrong. OP could have declined politely and kept walking." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "ESH weighs a rude hand gesture against deliberately ruining someone's filming. The gesture is minor by comparison and does not put the crew member in the wrong." },
          { agents: ["Bella"], text: "ESH blames the person gesturing. That person was likely focused on the shot and under some pressure, which explains the abrupt pointing. OP made the situation worse on purpose." },
        ],
      },
      NAH: {
        pros: [
          { agents: ["Bella"], text: "Someone was putting effort into the video, and walking through the shot set that work back. Spoiling someone's work in response to feeling slighted is unkind." },
          { agents: ["Zoe"], text: "The title states that OP ruined someone's filming, so OP knew the effect of the action. Ruining something on purpose is a wrong." },
          { agents: ["Mario"], text: "OP was entitled to refuse the detour and walk normally. Deliberately stepping in front of the camera goes beyond refusing, to spoiling the crew's work." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "NAH treats this as a clash of preferences. OP was asked for a detour of a few meters and walked into the shot instead. That is not an honest mistake." },
          { agents: ["Nathan", "Zoe"], text: "NAH treats this as a mistake. OP lists two reasons for being annoyed, then states that these are why they walked in front of the camera. The sequence shows a deliberate decision." },
        ],
      },
    },
  },
};

// The 2nd and 4th agents open by agreeing with the agent who spoke just before
// them. {name} is replaced by that agent's name. Set to "" to turn this off.
const AGREE_PREFIX = "I agree with {name}. ";

// The opening of the group chat, shown once at the start of the first chat (after the first post).
const INTRO_LINES = {
  welcome: "Welcome! We'll be discussing the post from Reddit's \"Am I the Asshole?\" community that you just read. Before we start, let's all introduce ourselves!",
  ask_participant: "Now it's your turn. Could you please introduce yourself briefly in a single sentence?",
  participant_placeholder: "Introduce yourself in one sentence...",
  thanks: "Thanks! Now that we know each other, let's discuss the post.",
};

// The intros above are shown only in the humanlike chat.
const HOST_LINES = {
  // Shown at the start of each discussion chat (both styles): the Host asks for the participant's verdict
  ask_verdict: "Having read the post, what is your verdict: YTA (You're the Asshole), NTA (Not the Asshole), ESH (Everyone Sucks Here), or NAH (No Assholes Here)?",
  // Shown after the verdict and before the agents (both styles)
  neutral: "Here is what the agents think about this post.",
};

const VERDICTS = [
  { code: "YTA", label: "YTA (You're the Asshole)" },
  { code: "NTA", label: "NTA (Not the Asshole)" },
  { code: "ESH", label: "ESH (Everyone Sucks Here)" },
  { code: "NAH", label: "NAH (No Assholes Here)" },
];

// Asked after the final verdict of each post. {initial} and {final} are filled in.
const REASON_QUESTION = {
  changed: "You first said <b>{initial}</b> and your final verdict is <b>{final}</b>. Why did you change your verdict?",
  unchanged: "You said <b>{initial}</b> both times. Why did you keep your verdict?",
  placeholder: "Explain in a sentence or two...",
  min_chars: 5,
};

const TEXT = {
  instructions: `<h2>Instructions</h2>
    <p>You will read two posts from Reddit's "Am I the Asshole?" (AITA) community and
    discuss each one in a group chat with a Host and five AI agents.</p>
    <p>For each post you will give your verdict in the chat, see what the agents think,
    and then give your final verdict and say why you did or did not change it.</p>`,
  read_post: "Please read this post carefully. You will give your verdict in the group chat next.",
  debrief: `<h2>Thank you!</h2>
    <p>Thank you for participating in the survey.</p>`,
  // Shown at the top of every page from the first post on, as a reminder of the verdicts
  verdict_key: `<b>YTA</b> You're the Asshole · <b>NTA</b> Not the Asshole ·
    <b>ESH</b> Everyone Sucks Here · <b>NAH</b> No Assholes Here`,
};
