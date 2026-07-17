import type { AccessRequest } from "@/lib/access-request";

type AccessRequestEmailProps = {
  request: AccessRequest;
  requestId: string;
  submittedAt: string;
};

const labelStyle = {
  color: "#789188",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

export function AccessRequestEmail({ request, requestId, submittedAt }: AccessRequestEmailProps) {
  return (
    <div style={{ backgroundColor: "#030406", color: "#e8edf4", fontFamily: "Arial, sans-serif", padding: "32px" }}>
      <div style={{ margin: "0 auto", maxWidth: "640px" }}>
        <div style={{ borderBottom: "1px solid #23302d", paddingBottom: "20px" }}>
          <p style={{ ...labelStyle, color: "#78f7d4", margin: 0 }}>NEXA AI / Private intelligence</p>
          <h1 style={{ fontSize: "30px", margin: "12px 0 0" }}>New acquisition briefing request</h1>
        </div>

        <div style={{ backgroundColor: "#0b0f15", border: "1px solid #23302d", borderRadius: "8px", marginTop: "24px", padding: "24px" }}>
          <p style={labelStyle}>Contact</p>
          <p style={{ fontSize: "20px", fontWeight: 700, margin: "8px 0 4px" }}>{request.name}</p>
          <p style={{ color: "#b9c5c1", margin: "4px 0" }}>{request.email}</p>
          {request.phone ? <p style={{ color: "#b9c5c1", margin: "4px 0" }}>{request.phone}</p> : null}

          <table cellPadding="0" cellSpacing="0" role="presentation" style={{ marginTop: "24px", width: "100%" }}>
            <tbody>
              {[
                ["Role", request.role],
                ["Track", request.interest],
                ["Capital range", request.budget],
                ["Target market", request.location],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={{ ...labelStyle, borderTop: "1px solid #1d2926", padding: "14px 12px 14px 0", width: "34%" }}>{label}</td>
                  <td style={{ borderTop: "1px solid #1d2926", color: "#f7fbfa", padding: "14px 0" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {request.message ? (
            <div style={{ borderTop: "1px solid #1d2926", marginTop: "4px", paddingTop: "18px" }}>
              <p style={labelStyle}>Mandate</p>
              <p style={{ color: "#d0d8d5", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{request.message}</p>
            </div>
          ) : null}
        </div>

        <p style={{ color: "#6f7d78", fontSize: "12px", lineHeight: 1.6, marginTop: "20px" }}>
          Request {requestId} / Submitted {submittedAt}. Reply directly to this email to contact the requester.
        </p>
      </div>
    </div>
  );
}
