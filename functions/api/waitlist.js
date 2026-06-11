export async function onRequestPost(context) {
	const { request, env } = context;

	let name, email, intent, message;

	try {
		const contentType = request.headers.get("content-type") || "";
		if (contentType.includes("application/json")) {
			const body = await request.json();
			({ name, email, intent, message } = body);
		} else {
			const body = await request.formData();
			name = body.get("name");
			email = body.get("email");
			intent = body.get("intent");
			message = body.get("message");
		}
	} catch {
		return Response.json({ error: "Invalid request." }, { status: 400 });
	}

	name = (name || "").trim();
	email = (email || "").trim();

	if (!name || !email) {
		return Response.json(
			{ error: "Name and email are required." },
			{ status: 400 }
		);
	}

	if (!email.includes("@") || !email.includes(".")) {
		return Response.json(
			{ error: "Please enter a valid email address." },
			{ status: 400 }
		);
	}

	const apiKey = env.RESEND_API_KEY;
	const notifyEmail = env.NOTIFY_EMAIL;

	if (!apiKey || !notifyEmail) {
		console.error("Missing RESEND_API_KEY or NOTIFY_EMAIL env vars");
		return Response.json({ error: "Server error. Please try again." }, { status: 500 });
	}

	const submittedAt = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";

	const textBody = [
		`New waitlist submission`,
		``,
		`Name:      ${name}`,
		`Email:     ${email}`,
		`Intent:    ${intent || "—"}`,
		`Message:   ${message || "—"}`,
		``,
		`Submitted: ${submittedAt}`,
	].join("\n");

	const htmlBody = `
<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;max-width:480px">
  <tr><td style="padding:6px 16px 6px 0;color:#888;white-space:nowrap">Name</td><td>${esc(name)}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#888;white-space:nowrap">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#888;white-space:nowrap">Intent</td><td>${esc(intent || "—")}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#888;white-space:nowrap;vertical-align:top">Message</td><td>${esc(message || "—")}</td></tr>
  <tr><td style="padding:18px 16px 6px 0;color:#aaa;font-size:12px" colspan="2">Submitted: ${submittedAt}</td></tr>
</table>`;

	let resendRes;
	try {
		resendRes = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: "Plancha360 Waitlist <waitlist@plancha360.com>",
				to: [notifyEmail],
				subject: `New waitlist signup — ${name}`,
				text: textBody,
				html: htmlBody,
			}),
		});
	} catch (err) {
		console.error("Resend fetch failed:", err);
		return Response.json({ error: "Failed to send. Please try again." }, { status: 500 });
	}

	if (!resendRes.ok) {
		const detail = await resendRes.text().catch(() => "");
		console.error("Resend error", resendRes.status, detail);
		return Response.json({ error: "Failed to send. Please try again." }, { status: 502 });
	}

	// Confirmation email to the person signing up. The signup itself has
	// succeeded at this point, so a failure here must not fail the request.
	const confirmationText = [
		`Hi ${name},`,
		``,
		`You're on the list. We'll reach out before August 2026 when the first Plancha360 grills are ready.`,
		``,
		`As an early supporter, you get €50 off the launch price — automatically applied when ordering opens. No code needed.`,
		``,
		`If you have questions in the meantime, just reply to this email.`,
		``,
		`— Tim, Plancha360`,
	].join("\n");

	const confirmationHtml = `
<div style="font-family:sans-serif;font-size:15px;line-height:1.6;max-width:480px">
  <p>Hi ${esc(name)},</p>
  <p>You're on the list. We'll reach out before August 2026 when the first Plancha360 grills are ready.</p>
  <p>As an early supporter, you get €50 off the launch price — automatically applied when ordering opens. No code needed.</p>
  <p>If you have questions in the meantime, just reply to this email.</p>
  <p>— Tim, Plancha360</p>
</div>`;

	try {
		const confirmRes = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: "Tim from Plancha360 <tim@plancha360.com>",
				to: [email],
				reply_to: "tim@plancha360.com",
				subject: "You're on the Plancha360 list.",
				text: confirmationText,
				html: confirmationHtml,
			}),
		});
		if (!confirmRes.ok) {
			const detail = await confirmRes.text().catch(() => "");
			console.error("Confirmation email error", confirmRes.status, detail);
		}
	} catch (err) {
		console.error("Confirmation email fetch failed:", err);
	}

	return Response.json({ success: true });
}

function esc(str) {
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
