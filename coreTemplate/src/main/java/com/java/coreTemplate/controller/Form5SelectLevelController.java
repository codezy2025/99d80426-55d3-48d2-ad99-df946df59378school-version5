package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.Form5SelectLevelService;
import com.java.coreTemplate.model.dto.Form5SelectLevel;

@RestController
@RequestMapping("/api/v1/form5-select-levels")
public class Form5SelectLevelController {
    private final Form5SelectLevelService service;

    public Form5SelectLevelController(Form5SelectLevelService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Form5SelectLevel> create(@RequestBody Form5SelectLevel entity) {
        Form5SelectLevel savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/form5-select-levels/" + savedEntity.getId())
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Form5SelectLevel> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Form5SelectLevel>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<Form5SelectLevel> page = service.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Form5SelectLevel> update(
            @PathVariable Long id, 
            @RequestBody Form5SelectLevel entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        Form5SelectLevel updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Form5SelectLevel>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Form5SelectLevel> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}