import './Experience.scss';

import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { IJob } from 'interface';
import Job from './components/Job';

const gap = 5;

const useFetchJob = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(
        query(collection(getFirestore(), 'jobs'), orderBy('order', 'asc')),
      );
      const jobs: IJob[] = [];
      querySnapshot.forEach((doc) => {
        jobs.push({ ...(doc as QueryDocumentSnapshot<IJob>).data() });
      });
      setJobs(jobs);
    };

    fetchJobs().catch(() => {});
  }, []);

  return jobs;
};

const useAnimateOnJobsFetched = (
  ref: React.RefObject<HTMLDivElement>,
  jobs: IJob[],
) => {
  useEffect(() => {
    if (!jobs.length) {
      return;
    }

    const element = ref.current!;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        scrub: true,
        start: '0% 0%',
        end: `+=${380 * 3}`,
      },
      defaults: {
        ease: 'linear',
      },
    });

    tl.to(element.querySelector('h2'), { y: -120, opacity: 0, duration: 1 });

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < i; j++) {
        tl.to(
          element.querySelector(`.job:nth-child(${j + 1})`),
          {
            scale: 1 - (i - j) * 0.01 * gap,
            duration: 1,
          },
          j === 0 ? '>=1' : '<',
        );
      }

      tl.to(
        element.querySelector(`.job:nth-child(${i + 1})`),
        {
          opacity: 1,
          y: `${(130 - i * gap) / 2}%`,
          duration: 1,
        },
        '<',
      );
      tl.to(element.querySelector(`.job:nth-child(${i + 1})`), {
        y: `${-15 + i * gap}%`,
      });
    }
  }, [jobs]);
};

const Experience = () => {
  const jobs = useFetchJob();
  const ref = useRef<HTMLDivElement>(null);
  useAnimateOnJobsFetched(ref, jobs);

  return (
    <div ref={ref} className="scroll-wrap">
      <div className="sticky-wrap">
        <section className="experience-sec">
          <div className="experience-container">
            <h2 className="heading">My Work Experience</h2>
            <ol>
              {jobs.map((job) => (
                <Job {...job} key={job.companyName} />
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Experience;
