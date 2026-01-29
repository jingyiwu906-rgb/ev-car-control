export default async function handler(req, res) {
  // 1. Read command from URL (example: ?c=F)
  const c = (req.query.c || "S").toUpperCase();

  // 2. Allow only valid commands
  const allowed = ["F", "B", "L", "R", "S", "P"];
  if (!allowed.includes(c)) {
    return res.status(400).send("Invalid command");
  }

  // 3. Read TalkBack credentials from Vercel
  const TALKBACK_ID = process.env.TALKBACK_ID;
  const TALKBACK_KEY = process.env.TALKBACK_KEY;

  if (!TALKBACK_ID || !TALKBACK_KEY) {
    return res.status(500).send("Missing TalkBack keys");
  }

  // 4. ThingSpeak TalkBack add-command URL
  const url = `https://api.thingspeak.com/talkbacks/${TALKBACK_ID}/commands`;

  // 5. Send command to ThingSpeak
  const body = new URLSearchParams();
  body.append("api_key", TALKBACK_KEY);
  body.append("command_string", c);

  await fetch(url, { method: "POST", body });

  // 6. Respond back to browser
  res.send("OK");
}
