import SectionTitle from "../components/SectionTitle"
import resumeData from "../data/resume.json"

function boldify(text) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function Home() {
  return (
    <div className="py-8 space-y-10">
    <section>
        <SectionTitle>Skills</SectionTitle>
        {
            resumeData.skills.map(({ label, value }) => (
                <p key={label}><strong>{label}:</strong> {value}</p>
            ))
        }
    </section>

    <section>
        <SectionTitle>Projects</SectionTitle>
        {
            resumeData.projects.map(({ name, tech, date, bullets }) => (
                <div key={name} className="mb-6">
                    <div className="flex flex-wrap justify-between gap-2">
                        <p><strong>{name}</strong> - {tech}</p>
                        <span className="text-gray-500 text-sm">{date}</span>
                    </div>

                    <ul className="list-disc list-inside mt-1 space-y-1">
                        {bullets.map((bullet, i)=> (
                            <li key={i} className="text-sm text-gray-700">{boldify(bullet)}</li>
                        ))}
                    </ul>

                </div>
            ))
        }
    </section>

    <section>
        <SectionTitle>Work Experience</SectionTitle>
        {
            resumeData.experience.map(({ company, location, role, dates, bullets }) => (
                <div key={company} className="mb-6">
                    <div className="flex flex-wrap justify-between gap-2">
                        <p><strong>{company}</strong></p>
                        <span className="text-gray-500 text-sm">{location}</span>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                        <p><em>{role}</em></p>
                        <span className="text-gray-500 text-sm">{dates}</span>
                    </div>

                    <ul className="list-disc list-inside mt-1 space-y-1">
                        {bullets.map((bullet, i)=> (
                            <li key={i} className="text-sm text-gray-700">{boldify(bullet)}</li>
                        ))}
                    </ul>
                </div>
            ))
        }
    </section>
      
    <section>
        <SectionTitle>Education</SectionTitle>
        {
            resumeData.education.map(({ school, status, location, degree, dates, courses }) => (
                <div key={school} className="mb-6">
                    <div className="flex flex-wrap justify-between gap-2">
                        <p><strong>{school}</strong> — {status}</p>
                        <span className="text-gray-500 text-sm">{location}</span>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                        <p>{degree}</p>
                        <span className="text-gray-500 text-sm">{dates}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1"><strong>Relevant Courses:</strong> {courses}</p>
                </div>
            ))
        }
    </section>

    <section>
        <SectionTitle>Leadership / Activities</SectionTitle>
        <p className="text-sm text-gray-700"><strong>Other CS events/contests:</strong> {resumeData.leadership.events}</p>
        <p className="text-sm text-gray-700"><strong>Certificates:</strong> {resumeData.leadership.certificates}</p>
        <p className="text-sm text-gray-700"><strong>Leadership:</strong></p>
        <ul className="list-disc list-inside space-y-1">
            {resumeData.leadership.roles.map((role, i) => (
            <li key={i} className="text-sm text-gray-700">{role}</li>
            ))}
        </ul>
        <p className="text-sm text-gray-700"><strong>Other Interests:</strong> {resumeData.leadership.interests}</p>
    </section>

     


    </div>
  )
}
