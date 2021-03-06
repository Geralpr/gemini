package com.gemini.services;

import com.gemini.beans.forms.EthnicCodeBean;
import com.gemini.beans.forms.StudentDemographicsBean;
import com.gemini.beans.requests.StudentAnswerRequest;
import com.gemini.beans.requests.StudentDemographicsRequest;
import com.gemini.database.jpa.entities.EthnicCodeEntity;
import com.gemini.database.jpa.entities.StudentEntity;
import com.gemini.database.jpa.respository.StudentRepository;
import com.gemini.utils.CopyUtils;
import com.google.common.base.Function;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/27/18
 * Time: 11:45 PM
 */
@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public StudentDemographicsBean retrieveDemographicsInfo(Long studentId) {
        final StudentEntity entity = studentRepository.findOne(studentId);
        StudentDemographicsBean demographicsBean = CopyUtils.convert(entity, StudentDemographicsBean.class);
        List<EthnicCodeBean> ethnicCodeBeans = CopyUtils.convert(entity.getEthnicCodes(), EthnicCodeBean.class);
        demographicsBean.setEthnicCodes(ethnicCodeBeans);
        return demographicsBean;
    }

    public boolean saveDemographicsInfo(StudentDemographicsRequest request) {
        StudentEntity entity = studentRepository.findOne(request.getStudentId());
        entity.setCitizenship(request.getCitizenship());
        entity.setLanguage(request.getLanguage());
        List<EthnicCodeEntity> ethnicCodeDB = entity.getEthnicCodes();
        List<EthnicCodeBean> ethnicCodeBeanList = CopyUtils.convert(ethnicCodeDB, EthnicCodeBean.class);
        Set<EthnicCodeBean> ethnicCodesFormInDb = new HashSet<>(ethnicCodeBeanList);
        Set<EthnicCodeBean> ethnicCodesToSave = Sets.newHashSet();


        boolean deleting = request.getEthnicCodesToDelete() != null && !request.getEthnicCodesToDelete().isEmpty();
        boolean adding = request.getEthnicCodes() != null && !request.getEthnicCodes().isEmpty();
        //deleting
        if (deleting) {
            ethnicCodesToSave = Sets.difference(ethnicCodesFormInDb, Sets.newHashSet(request.getEthnicCodesToDelete()));
            ethnicCodesFormInDb = ethnicCodesToSave;
        }
        //adding
        if (adding)
            ethnicCodesToSave = Sets.union(ethnicCodesFormInDb, new HashSet<>(request.getEthnicCodes()));

        if (!(adding || deleting)) {
            ethnicCodesToSave = ethnicCodesFormInDb;
        }

        List<EthnicCodeEntity> toSave = FluentIterable
                .from(Lists.newArrayList(ethnicCodesToSave))
                .transform(new Function<EthnicCodeBean, EthnicCodeEntity>() {
                    @Override
                    public EthnicCodeEntity apply(EthnicCodeBean bean) {
                        return CopyUtils.convert(bean, EthnicCodeEntity.class);
                    }
                })
                .toList();

        entity.getEthnicCodes().clear();
        entity.getEthnicCodes().addAll(toSave);

        entity = studentRepository.save(entity);
        return entity != null;
    }

    public boolean saveIsBornPR(StudentAnswerRequest request) {
        StudentEntity entity = studentRepository.findOne(request.getStudentId());
        entity.setBornPR(request.getAnswer());
        entity = studentRepository.save(entity);
        return entity != null;
    }

    public boolean saveIsHispanic(StudentAnswerRequest request) {
        StudentEntity entity = studentRepository.findOne(request.getStudentId());
        entity.setHispanic(request.getAnswer());
        entity = studentRepository.save(entity);
        return entity != null;
    }


    public boolean saveRequestTransportation(StudentAnswerRequest request) {
        StudentEntity entity = studentRepository.findOne(request.getStudentId());
        entity.setTransportationRequested(request.getAnswer());
        entity = studentRepository.save(entity);
        return entity != null;
    }
}