package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Form5SelectLevelRepository;
import com.java.coreTemplate.model.dto.Form5SelectLevel;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class Form5SelectLevelService {

    private final Form5SelectLevelRepository repository;

    public Form5SelectLevelService(Form5SelectLevelRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "form5SelectLevels", allEntries = true)
    public Form5SelectLevel save(Form5SelectLevel entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "form5SelectLevels", key = "#id")
    public Optional<Form5SelectLevel> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("form5SelectLevels")
    public List<Form5SelectLevel> findAll() {
        return repository.findAll();
    }

    public Page<Form5SelectLevel> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "form5SelectLevels", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Form5SelectLevel> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Cacheable(value = "form5SelectLevels", key = "#name")
    public Optional<Form5SelectLevel> findByName(String name) {
        return repository.findByName(name);
    }

    @Transactional
    @CacheEvict(value = "form5SelectLevels", allEntries = true)
    public List<Form5SelectLevel> saveAll(List<Form5SelectLevel> entities) {
        return repository.saveAll(entities);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}