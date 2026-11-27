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
    title: "AITA “blocking” a cycleist from passing on bridge that is pedestrian only.",
    body: `<p>Part of my walk/ with my dogs is on a college campus. We walk over a pedestrian bridge. on both sides of the bridge there are signs that it is pedestrian only as well as poles and things on the ground to deter bikes and other modes of transit from riding on the bridge. Of Course, people will get off, walk through/over them and get back on.</p>
      <p>When I walk on the bridge, I give my dogs as Much slack as possible which usally ends with me in the middle of the bridge and my dogs right next to the railing. Of course, if someone is coming from the other way I pull my dogs close to me and get to the side and also look back constantly in case a runner is coming. However, I don’t feel I need to move out of the way from a biker, skateboarder or scooter rider.</p>
      <p>I was off today so, was on a walk later than I usually am on week day. A cyclist was in front of us, swerved to a stop in front of us and angrily said, “you’re blocking the bridge.” I said, ”and you‘re on a bike.” The man said, “so fucking what?“ I replied, ’This is a pedestrian bridge.” Dude got off his bike and walked in passed me but called me a jackass.</p>
      <p>AITA?</p>`,
    agent_messages: {
      NTA: {
        // The participant said YTA
        YTA: {
          Cody:   "I'd say NTA. YTA doesn't really fit, because the bridge is marked pedestrian only on both ends and even has poles to keep bikes off. OP was using it exactly as intended, so there was no duty to clear a path for someone riding where they weren't allowed.",
          Bella:  "To me this is NTA. YTA feels off because the cyclist swerved to a stop right in front of OP and the dogs and started off angry. OP's replies were short and factual, while he swore and called OP a jackass, so the hostility came from him.",
          Nathan: "This reads as NTA. YTA skips the order of events: the cyclist rode past the barriers, stopped in front of OP, complained, swore, and then got off and walked his bike past. He could have done that last step from the start, and the conflict came from skipping it.",
          Zoe:    "I'm going with NTA. YTA overlooks the detail that OP pulls the dogs in and moves aside for anyone walking or running toward them, and keeps checking behind for runners. OP makes room for the people the bridge is meant for, which is fair.",
          Mario:  "My take is NTA. YTA treats OP's position as the problem, but OP was entitled to walk in the middle of a pedestrian bridge. The cyclist always had the option of getting off and walking, which is what the signs ask of everyone."
        },
        // The participant said ESH
        ESH: {
          Cody:   "I'd say NTA. The cyclist swearing wasn't great, but ESH doesn't fit because OP's reply, \"and you're on a bike,\" was blunt, not cruel. It was tied directly to him riding on a pedestrian bridge, not a dig at him as a person.",
          Bella:  "To me this is NTA. I get why ESH comes up, since OP's comeback was a bit sharp, but OP was the one who got cut off and sworn at. Answering with two short facts after being treated like that is pretty restrained, not something to count against OP.",
          Nathan: "This reads as NTA. The cyclist's reaction was a poor move, but ESH misses how OP handled each step: walking where walking is allowed, answering his complaint calmly, and letting him pass once he got off the bike. None of those steps added to the problem.",
          Zoe:    "I'm going with NTA. The cyclist was out of line, and ESH counts the long leashes against OP, but the dogs were kept by the railing, and OP reels them in for oncoming walkers and runners. That's an ordinary way to walk dogs on a footbridge, not a wrong.",
          Mario:  "My take is NTA. The cyclist was rude, but ESH asks OP to have handled it perfectly, and OP was entitled to point out the bridge is pedestrian only. Stating the rule that is posted on both ends is a reasonable thing to say, not a wrong."
        },
        // The participant said NAH
        NAH: {
          Cody:   "I'd say NTA. NAH lets the cyclist off too easily, because he rode onto a bridge that is clearly marked for pedestrians and then swore at OP. Ignoring signs and barriers isn't a misunderstanding, it's a choice to break the rule.",
          Bella:  "To me this is NTA. NAH treats this like a bad moment, but the cyclist swerved in front of OP and the dogs, swore, and called OP a jackass. Treating someone that way for walking on a footbridge is unkind, even if he was in a hurry.",
          Nathan: "This reads as NTA. NAH assumes things just went wrong, but look at the sequence: the cyclist passed the poles, rode onto the bridge, and then demanded that OP move. The conflict followed choices he made before OP said anything.",
          Zoe:    "I'm going with NTA. NAH would make sense if the rules were unclear, but there are signs on both sides of the bridge and things on the ground to stop bikes. With all that in place, riding across was a decision, not an honest mistake.",
          Mario:  "My take is NTA. NAH doesn't account for the cyclist expecting OP to clear the way while he was the one breaking the posted rule. Demanding that others make room for something that isn't allowed there is a real failing on his part."
        },
      },
      YTA: {
        // The participant said NTA
        NTA: {
          Cody:   "I'd say YTA. NTA leans on the pedestrian-only signs, but OP admits to taking up the middle of the bridge on purpose and refusing to move for bikes. Choosing to block someone to make a point turns a rule into a standoff.",
          Bella:  "To me this is YTA. NTA focuses on the cyclist breaking the rule, but having to swerve to a stop next to two dogs on long leashes is startling. Being met with a sarcastic comeback after that would frustrate anyone, so his anger makes sense.",
          Nathan: "This reads as YTA. NTA gives OP credit for answering calmly, but when the cyclist said OP was blocking the bridge, OP replied with a comeback instead of moving aside. That reply is what turned the exchange into swearing and name-calling.",
          Zoe:    "I'm going with YTA. NTA treats the long leashes as harmless, but OP says the dogs are right next to the railing while OP is in the middle. That means the leash stretches across the walkway, which is a tripping hazard for anyone on the bridge.",
          Mario:  "My take is YTA. NTA says the cyclist shouldn't have been riding, and that may be true, but OP isn't the one who enforces campus rules. OP could have simply shortened the leashes for a few seconds instead of adding a lecture about the signs."
        },
        // The participant said ESH
        ESH: {
          Cody:   "I'd say YTA. ESH counts the cyclist riding on the bridge, but that's a small thing next to OP deliberately blocking him to prove a point. Getting irritated after being blocked on purpose is a pretty normal reaction.",
          Bella:  "To me this is YTA. ESH puts some blame on the cyclist, but plenty of people ride across, as OP says, and he was likely just trying to get somewhere. Being stopped and talked down to is real frustration on his side, while OP chose to cause it.",
          Nathan: "This reads as YTA. ESH suggests both sides slipped, but the cyclist pointed out the problem, heard the rule, then got off and walked his bike past. He ended up following the rule, and the only escalation in that sequence came from OP's comeback.",
          Zoe:    "I'm going with YTA. ESH treats the cyclist's swearing as the main problem, but OP had already said they don't feel they need to move for bikes. Planning in advance not to make room for someone shows the blocking was intentional, not a fault of his.",
          Mario:  "My take is YTA. ESH spreads the blame, but the cyclist did about what anyone would do, which is ask the person in the way to move. OP could have stepped aside and let campus security handle the rule, rather than turning it into a confrontation."
        },
        // The participant said NAH
        NAH: {
          Cody:   "I'd say YTA. NAH makes it sound like a misunderstanding, but OP knowingly stays in the middle of the bridge and refuses to move for bikes. That was a choice OP made in advance, not an accident or a slip.",
          Bella:  "To me this is YTA. NAH misses how frustrated the cyclist already was when he swerved to a stop. OP's comeback told him his problem didn't count for much, and that adds to the tension rather than being a harmless difference of opinion.",
          Nathan: "This reads as YTA. NAH would fit if OP didn't realize they were in the way, but the cyclist said so directly. Answering with a comeback with that knowledge, instead of moving over, is a decision, not an honest mistake.",
          Zoe:    "I'm going with YTA. NAH frames this as a clash over the rules, but long leashes stretched across a narrow bridge are a hazard to everyone, including the dogs. Keeping them that way on purpose goes past a difference of opinion into being careless.",
          Mario:  "My take is YTA. NAH overlooks OP's own rule, which is to move aside for walkers and runners but not for bikes. That treats cyclists as people to be punished, and that attitude is what led straight to the confrontation on the bridge."
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
  // Heading of the pros/cons page (the factual condition has no chat and no Host).
  title: "AI agents' analysis",
  // How each agent is named in the list. Neutral labels, so the factual chat has no names.
  labels: { Cody: "Agent 1", Bella: "Agent 2", Nathan: "Agent 3", Zoe: "Agent 4", Mario: "Agent 5" },
};

const FACTUAL_LISTS = {
  A: {
    NTA: {
      YTA: {
        pros: [
          { agents: ["Cody", "Bella"], text: "The bridge is marked pedestrian only on both ends and has poles to keep bikes off. OP was using it as intended and had no duty to clear a path for a cyclist riding there." },
          { agents: ["Bella"], text: "The cyclist swerved to a stop in front of OP and the dogs and opened with an angry complaint. OP's replies were short and factual. The cyclist swore and called OP a jackass." },
          { agents: ["Mario"], text: "OP was entitled to walk in the middle of a pedestrian bridge. The cyclist always had the option to dismount and walk, as the signs require of everyone." },
        ],
        cons: [
          { agents: ["Nathan", "Zoe"], text: "YTA omits the order of events. The cyclist rode past the barriers, stopped, complained, swore, then dismounted and walked past. Dismounting was available from the start." },
          { agents: ["Zoe"], text: "YTA omits that OP pulls the dogs in and moves aside for oncoming walkers and runners, and checks behind for runners. OP makes room for the bridge's intended users." },
        ],
      },
      ESH: {
        pros: [
          { agents: ["Bella"], text: "OP was cut off and sworn at. OP answered with two short factual statements, which is a restrained response." },
          { agents: ["Nathan", "Zoe"], text: "OP's steps: walked where walking is allowed, answered the complaint, let the cyclist pass once he dismounted. None of these steps added to the problem." },
          { agents: ["Mario"], text: "The cyclist was rude. OP stated that the bridge is pedestrian only, which is the rule posted on both ends. Stating a posted rule is a reasonable action." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "The cyclist swore at OP. OP's reply \"and you're on a bike\" was blunt, but it referred to riding on a pedestrian bridge, not to the cyclist as a person." },
          { agents: ["Zoe"], text: "ESH counts the long leashes against OP. The dogs were kept by the railing, and OP reels them in for oncoming walkers and runners. This is an ordinary way to walk dogs on a footbridge." },
        ],
      },
      NAH: {
        pros: [
          { agents: ["Bella"], text: "The cyclist swerved in front of OP and the dogs, swore, and called OP a jackass. Treating someone that way for walking on a footbridge is unkind, regardless of being in a hurry." },
          { agents: ["Nathan", "Zoe"], text: "Sequence: the cyclist passed the poles, rode onto the bridge, then demanded that OP move. The conflict followed his choices, made before OP said anything." },
          { agents: ["Mario"], text: "The cyclist expected OP to clear the way while he was breaking the posted rule. Demanding room for an activity that is not allowed there is a failing on his part." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "NAH does not account for the cyclist riding onto a bridge clearly marked for pedestrians and then swearing at OP. Ignoring signs and barriers is a choice, not a misunderstanding." },
          { agents: ["Zoe"], text: "NAH would apply if the rules were unclear. There are signs on both sides and obstacles on the ground to stop bikes, so riding across was a decision." },
        ],
      },
    },
    YTA: {
      NTA: {
        pros: [
          { agents: ["Cody", "Bella"], text: "OP states that they take up the middle of the bridge on purpose and do not move for bikes. Deliberately blocking someone to make a point turns a rule into a standoff." },
          { agents: ["Bella"], text: "The cyclist had to swerve to a stop next to two dogs on long leashes, then received a sarcastic reply. Frustration is an expected response to that sequence." },
          { agents: ["Mario"], text: "Even if the cyclist should not have been riding, OP does not enforce campus rules. OP could have shortened the leashes for a few seconds without commenting on the signs." },
        ],
        cons: [
          { agents: ["Nathan", "Zoe"], text: "NTA credits OP for answering calmly. When told they were blocking the bridge, OP replied with a comeback instead of moving aside. The swearing and name-calling followed that reply." },
          { agents: ["Zoe"], text: "NTA treats the long leashes as harmless. With OP in the middle and the dogs at the railing, the leash stretches across the walkway, which is a tripping hazard for anyone on the bridge." },
        ],
      },
      ESH: {
        pros: [
          { agents: ["Nathan", "Zoe"], text: "The cyclist raised the problem, heard the rule, then dismounted and walked past. He complied with the rule. The only escalation in the sequence came from OP's comeback." },
          { agents: ["Mario"], text: "The cyclist asked the person in the way to move, which is the expected action. OP could have stepped aside and left the rule to campus security instead of starting a confrontation." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "ESH counts the cyclist riding on the bridge. That is minor compared with OP deliberately blocking him to prove a point. Irritation after being blocked on purpose is a normal reaction." },
          { agents: ["Bella"], text: "ESH puts some blame on the cyclist. OP states that many people ride across, and he was likely trying to get somewhere. Being stopped and talked down to caused real frustration." },
          { agents: ["Zoe"], text: "ESH treats the cyclist's swearing as the main problem. OP had decided in advance not to move for bikes, so the blocking was intentional." },
        ],
      },
      NAH: {
        pros: [
          { agents: ["Bella"], text: "The cyclist was already frustrated when he swerved to a stop. OP's comeback signalled that his problem did not count, which added to the tension." },
          { agents: ["Zoe"], text: "Long leashes stretched across a narrow bridge are a hazard to everyone, including the dogs. Keeping them that way on purpose is careless, not a difference of opinion." },
          { agents: ["Mario"], text: "OP's own rule is to move aside for walkers and runners but not for bikes. This treats cyclists as people to be punished, and it led directly to the confrontation." },
        ],
        cons: [
          { agents: ["Cody", "Bella"], text: "NAH frames this as a misunderstanding. OP knowingly stays in the middle of the bridge and refuses to move for bikes. This was a choice made in advance, not an accident." },
          { agents: ["Nathan", "Zoe"], text: "NAH would apply if OP did not realize they were in the way. The cyclist said so directly. Replying with a comeback instead of moving over is a decision, not a mistake." },
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
    see what five AI agents think about each one. For one post the agents discuss
    it with you in a group chat; for the other they give a list of points.</p>
    <p>For each post you will give your verdict, see what the agents think,
    and then give your final verdict and say why you did or did not change it.</p>`,
  read_post: "Please read this post carefully. You will give your verdict in the group chat next.",
  // Factual condition: shown under the post, above the four verdict buttons
  factual_verdict: "Please read this post carefully. What is your verdict?",
  debrief: `<h2>Thank you!</h2>
    <p>Thank you for participating in the survey.</p>`,
  // Shown at the top of every page from the first post on, as a reminder of the verdicts
  verdict_key: `<b>YTA</b> You're the Asshole · <b>NTA</b> Not the Asshole ·
    <b>ESH</b> Everyone Sucks Here · <b>NAH</b> No Assholes Here`,
};
